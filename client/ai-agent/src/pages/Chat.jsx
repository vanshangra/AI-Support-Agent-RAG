import { useState, useEffect, useRef } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useToast } from "../components/ToastContainer";
import { MessageSkeleton, LoadingSpinner, EmptyState } from "../components/LoadingStates";
import { Send, MessageCircle, Copy, Check, Zap } from "lucide-react";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const ask = async () => {
    if (!question.trim()) {
      toast.warning("Please enter a question");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/chat/ask", { question });
      setMessages([
        ...messages,
        {
          question,
          answer: res.data.answer,
          sources: res.data.sources,
          timestamp: new Date(),
        },
      ]);
      setQuestion("");
      toast.success("Response received successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get response");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      ask();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <EmptyState
                icon={MessageCircle}
                title="Start a Conversation"
                description="Ask questions about your documents. Our AI-powered agent will find the best answers using RAG technology."
              />
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className="space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl rounded-tr-none px-6 py-4 shadow-lg">
                      <p className="text-sm leading-relaxed">{msg.question}</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="max-w-2xl bg-white rounded-2xl rounded-tl-none border border-gray-200 shadow-lg overflow-hidden">
                      <div className="px-6 py-4 space-y-4">
                        {/* Answer */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              AI Response
                            </p>
                          </div>
                          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {msg.answer}
                          </p>
                        </div>

                        {/* Divider */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="border-t border-gray-100 pt-4">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                📚 Sources ({msg.sources.length})
                              </p>
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    msg.sources.map((s) => `• ${s}`).join("\n"),
                                    `sources-${i}`
                                  )
                                }
                                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                              >
                                {copied === `sources-${i}` ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="space-y-2">
                              {msg.sources.map((source, idx) => (
                                <div
                                  key={idx}
                                  className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-100 transition-colors"
                                >
                                  📄 {typeof source === 'string' ? source : `${source.document_id} - Chunk ${source.chunk_index}`}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Copy Answer */}
                        <button
                          onClick={() => copyToClipboard(msg.answer, `answer-${i}`)}
                          className="mt-3 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
                        >
                          {copied === `answer-${i}` ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Answer
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-none border border-gray-200 shadow-lg px-6 py-4">
                    <MessageSkeleton />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white border-t border-gray-200 shadow-lg sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
              placeholder="Ask a question... (Shift+Enter for new line)"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              rows="2"
            />
            <button
              onClick={ask}
              disabled={loading || !question.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed flex-shrink-0"
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  <span className="hidden sm:inline">Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}