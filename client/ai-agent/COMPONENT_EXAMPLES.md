# Component Examples & Usage Patterns

## Button Component

### Basic Usage
```jsx
import { Button } from '../components/UI';

export function Demo() {
  return (
    <>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="outline">Outline</Button>
    </>
  );
}
```

### With Icons
```jsx
import { Send, Trash2 } from 'lucide-react';
import { Button } from '../components/UI';

export function IconButtons() {
  return (
    <>
      <Button className="flex items-center gap-2">
        <Send className="w-4 h-4" />
        Send Message
      </Button>
      
      <Button variant="danger" className="flex items-center gap-2">
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>
    </>
  );
}
```

### Loading State
```jsx
import { Button } from '../components/UI';

export function LoadingButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await performAction();
        setLoading(false);
      }}
    >
      {loading ? 'Loading...' : 'Click Me'}
    </Button>
  );
}
```

## Input Component

### Basic Email Input
```jsx
import { Input } from '../components/UI';
import { Mail } from 'lucide-react';

export function EmailInput() {
  const [email, setEmail] = useState('');

  return (
    <Input
      type="email"
      label="Email Address"
      placeholder="you@example.com"
      icon={Mail}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}
```

### With Validation
```jsx
import { Input } from '../components/UI';
import { useState } from 'react';

export function ValidatedInput() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    
    if (val.length < 3) {
      setError('Minimum 3 characters');
    } else {
      setError('');
    }
  };

  return (
    <Input
      label="Username"
      placeholder="Enter username"
      value={value}
      onChange={handleChange}
      error={error}
    />
  );
}
```

## Card Component

### Basic Card
```jsx
import { Card } from '../components/UI';

export function BasicCard() {
  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Card Title</h2>
      <p className="text-gray-600">Card content goes here</p>
    </Card>
  );
}
```

### Card with Header & Footer
```jsx
import { Card } from '../components/UI';
import { Button } from '../components/UI';

export function CardWithActions() {
  return (
    <Card>
      <div className="pb-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900">Card Header</h3>
      </div>
      
      <div className="py-4">
        <p className="text-gray-600">Main content here</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </div>
    </Card>
  );
}
```

### Grid Layout
```jsx
import { Card } from '../components/UI';

export function CardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <Card key={item}>
          <h3 className="font-bold mb-2">Item {item}</h3>
          <p className="text-sm text-gray-500">Description</p>
        </Card>
      ))}
    </div>
  );
}
```

## Badge Component

### Color Variants
```jsx
import { Badge } from '../components/UI';

export function BadgeVariants() {
  return (
    <>
      <Badge variant="blue">In Progress</Badge>
      <Badge variant="green">Completed</Badge>
      <Badge variant="yellow">Pending</Badge>
      <Badge variant="red">Failed</Badge>
    </>
  );
}
```

### In List Items
```jsx
import { Badge } from '../components/UI';

export function ItemsWithBadges() {
  const items = [
    { id: 1, name: 'Feature A', status: 'completed' },
    { id: 2, name: 'Feature B', status: 'in-progress' },
    { id: 3, name: 'Feature C', status: 'pending' },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center">
          <span>{item.name}</span>
          <Badge variant={item.status === 'completed' ? 'green' : 'yellow'}>
            {item.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}
```

## Alert Component

### Info Alert
```jsx
import { Alert } from '../components/UI';
import { Info } from 'lucide-react';

export function InfoAlert() {
  return (
    <Alert
      variant="info"
      icon={Info}
      title="Information"
      description="This is an informational message"
    />
  );
}
```

### Error Alert with Action
```jsx
import { Alert } from '../components/UI';
import { AlertCircle } from 'lucide-react';

export function ErrorAlert() {
  return (
    <Alert
      variant="error"
      icon={AlertCircle}
      title="Error"
      description="Something went wrong. Please try again."
    />
  );
}
```

### Success Alert
```jsx
import { Alert } from '../components/UI';
import { CheckCircle } from 'lucide-react';

export function SuccessAlert() {
  return (
    <Alert
      variant="success"
      icon={CheckCircle}
      title="Success"
      description="Your changes have been saved"
    />
  );
}
```

## Toast Notifications

### Basic Usage
```jsx
import { useToast } from '../components/ToastContainer';
import { Button } from '../components/UI';

export function ToastDemo() {
  const toast = useToast();

  return (
    <>
      <Button onClick={() => toast.success('Task completed!')}>
        Show Success
      </Button>
      <Button onClick={() => toast.error('Something went wrong')}>
        Show Error
      </Button>
      <Button onClick={() => toast.warning('Please review')}>
        Show Warning
      </Button>
      <Button onClick={() => toast.info('For your information')}>
        Show Info
      </Button>
    </>
  );
}
```

### In Form Submissions
```jsx
import { useToast } from '../components/ToastContainer';
import { Button, Input } from '../components/UI';
import { useState } from 'react';

export function FormWithToast() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Email sent successfully!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
}
```

## Loading States

### Skeleton Loader
```jsx
import { Skeleton } from '../components/LoadingStates';

export function SkeletonExample() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
```

### Empty State
```jsx
import { EmptyState } from '../components/LoadingStates';
import { FileText } from 'lucide-react';
import { Button } from '../components/UI';

export function EmptyDocuments() {
  return (
    <EmptyState
      icon={FileText}
      title="No Documents"
      description="Upload your first document to get started"
      action={
        <Button>Upload Document</Button>
      }
    />
  );
}
```

### Spinner
```jsx
import { LoadingSpinner } from '../components/LoadingStates';

export function LoadingExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner />
      <span className="ml-3">Loading...</span>
    </div>
  );
}
```

## Complex Patterns

### Form with Validation
```jsx
import { Input, Button, Alert } from '../components/UI';
import { useToast } from '../components/ToastContainer';
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export function ComplexForm() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors above');
      return;
    }

    setLoading(true);
    try {
      // Submit form
      toast.success('Account created successfully!');
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      {Object.keys(errors).length > 0 && (
        <Alert
          variant="error"
          icon={AlertCircle}
          title="Validation Failed"
          description="Please fix the errors above"
        />
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}
```

### Modal-like Overlay
```jsx
import { Button, Card } from '../components/UI';
import { X } from 'lucide-react';
import { useState } from 'react';

export function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Modal Title</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Modal content goes here</p>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Confirm
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
```

## Best Practices

### ✅ Do
- Use components from the UI library for consistency
- Combine multiple utilities (Button + Loader)
- Handle loading and error states
- Use toasts for non-critical feedback
- Keep components focused and reusable

### ❌ Don't
- Create duplicate button styles
- Use `alert()` for notifications
- Hardcode colors outside design tokens
- Mix component libraries
- Forget loading states on async actions

---

**Remember**: Always import from `../components/UI` for consistency!
