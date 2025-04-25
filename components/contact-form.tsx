'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Échec de l’envoi');

      toast.success('Message envoyé avec succès !');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Erreur lors de l’envoi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div className="grid gap-1">
          <Label htmlFor="name">Nom</Label>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="subject">Sujet</Label>
          <Input name="subject" value={formData.subject} onChange={handleChange} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="message">Message</Label>
          <Textarea name="message" value={formData.message} onChange={handleChange} rows={5} />
        </div>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Envoi en cours…' : 'Envoyer'}
        </Button>
      </form>
    </>
  );
}
