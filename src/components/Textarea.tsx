import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`appearance-none block w-full px-4 py-3 border ${
            error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-black focus:border-black'
          } rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none transition-all sm:text-sm bg-gray-50 focus:bg-white resize-y min-h-[120px] ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
