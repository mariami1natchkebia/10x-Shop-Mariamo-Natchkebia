interface ToastProps {
  message: string
  ok?: boolean
}

function Toast({ message, ok = true }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-lg ${
        ok ? 'bg-[#3b4d3c]' : 'bg-red-600'
      }`}
    >
      {message}
    </div>
  )
}

export default Toast