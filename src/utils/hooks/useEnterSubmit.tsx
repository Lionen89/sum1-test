import React from 'react'

interface UseEnterSubmitProps {
  handleSubmit: () => void
}

const useEnterSubmit = ({ handleSubmit }: UseEnterSubmitProps): void => {
  React.useEffect(() => {
    function handleEnter(e: KeyboardEvent): void {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      }
    }

    document.addEventListener('keydown', handleEnter)

    return () => document.removeEventListener('keydown', handleEnter)
  }, [handleSubmit])
}

export default useEnterSubmit
