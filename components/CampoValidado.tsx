// components/CampoValidado.tsx
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface CampoValidadoProps {
  label: string
  error?: string
  ayuda?: string
  required?: boolean
  tipo?: 'input' | 'textarea' | 'select'
  children?: React.ReactNode // Para opciones de select
}

type InputProps = CampoValidadoProps & InputHTMLAttributes<HTMLInputElement>
type TextareaProps = CampoValidadoProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function CampoValidado({ 
  label, 
  error, 
  ayuda, 
  required = false, 
  tipo = 'input',
  children,
  ...props 
}: InputProps | TextareaProps) {
  const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
  const errorClasses = error ? "border-red-300 focus:ring-red-500" : "border-gray-300"
  
  const renderInput = () => {
    switch (tipo) {
      case 'textarea':
        return (
          <textarea
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={`${baseClasses} ${errorClasses} resize-none`}
          />
        )
      case 'select':
        return (
          <select
            {...(props as InputHTMLAttributes<HTMLSelectElement>)}
            className={`${baseClasses} ${errorClasses}`}
          >
            {children}
          </select>
        )
      default:
        return (
          <input
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            className={`${baseClasses} ${errorClasses}`}
          />
        )
    }
  }

  return (
    <div className="space-y-1">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {renderInput()}
      
      {error && (
        <div className="flex items-center gap-1 text-red-600 text-sm">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
      
      {ayuda && !error && (
        <p className="text-xs text-gray-500">{ayuda}</p>
      )}
    </div>
  )
}