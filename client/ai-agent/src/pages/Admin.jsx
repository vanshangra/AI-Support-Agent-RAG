import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useToast } from "../components/ToastContainer";
import { EmptyState, LoadingSpinner } from "../components/LoadingStates";
import { Trash2, FileText, Upload, Calendar, ChevronRight, AlertCircle } from "lucide-react";

export default function Admin() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useState(null)[1];
  const toast = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/documents");
      setDocs(res.data);
    } catch (error) {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const deleteDoc = async (id, title) => {
    setDeleting(id);
    try {
      await API.delete(`/admin/documents/${id}`);
      setDocs(docs.filter((d) => d._id !== id));
      toast.success(`"${title}" deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete document");
    } finally {
      setDeleting(null);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      toast.error('Only PDF files are supported');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await API.post('/admin/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Document uploaded successfully');
      fetchDocuments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const stats = {
    total: docs.length,
    recentUpdates: docs.filter(d => {
      const date = new Date(d.updatedAt || d.createdAt);
      return (Date.now() - date) < 7 * 24 * 60 * 60 * 1000;
    }).length,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Document Management</h1>
          <p className="text-gray-600">Upload and manage your knowledge base documents</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recently Updated</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.recentUpdates}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upload Documents</h2>
              <p className="text-sm text-gray-600">Add PDF files to your knowledge base</p>
            </div>
          </div>

          <label className="block">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-700 font-medium mb-1">
                {uploading ? 'Uploading...' : 'Drop files here or click to upload'}
              </p>
              <p className="text-sm text-gray-500">PDF files only (Max 50MB)</p>
            </div>
          </label>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Documents</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : docs.length === 0 ? (
            <div className="p-12">
              <EmptyState
                icon={FileText}
                title="No Documents Yet"
                description="Upload your first document to get started building your knowledge base"
                action={
                  <label className="inline-block">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    <span className="bg-linear-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all cursor-pointer inline-block">
                      Upload Document
                    </span>
                  </label>
                }
              />
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {docs.map((doc) => (
                <div
                  key={doc._id}
                  className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{doc.title || doc.filename}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Created{' '}
                        {new Date(doc.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteDoc(doc._id, doc.title || doc.filename)}
                    disabled={deleting === doc._id}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete document"
                  >
                    {deleting === doc._id ? (
                      <div className="w-5 h-5 border-2 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Pro Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Upload high-quality PDFs for better extraction</li>
                <li>• Use clear document titles for easy identification</li>
                <li>• You can upload documents in different formats (coming soon)</li>
                <li>• Larger knowledge bases provide better AI responses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}