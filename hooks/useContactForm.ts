import { useState, FormEvent } from 'react';
import { DIAGNOSIS_OPTIONS } from '../constants/contactData';

export const useContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    frictionPoint: DIAGNOSIS_OPTIONS[0], // Default to first option
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // SIMULATE API CALL
    // In production, replace this with: await fetch('/api/contact', { ... })
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const updateField = (field: keyof typeof formState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return { formState, updateField, status, handleSubmit };
};
