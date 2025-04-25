// components/admin/product/CreateProductPageContent.tsx

'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Gamme {
  id: string;
  name: string;
}

interface Props {
  mode: 'create' | 'edit';
  initialData?: any;
  lang: string;
  productId?: string;
}

export default function CreateProductPageContent({ mode, initialData, lang, productId }: Props) {
  const router = useRouter();
  const [gammes, setGammes] = useState<Gamme[]>([]);
  const [form, setForm] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    image: null as File | null,
    imageUrl: initialData?.imageUrl || '',
    language: initialData?.language || lang,
    isFeatured: initialData?.isFeatured || false,
    gammeId: initialData?.gammeId || '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/gammes?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => setGammes(data));
  }, [lang]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async () => {
    const { name, description, image, imageUrl, language, isFeatured, gammeId } = form;

    if (!name || !description || (!image && !imageUrl) || !language || !gammeId) {
      toast.error('Tous les champs sont requis.');
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = imageUrl;

      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url;
      }

      const method = mode === 'edit' ? 'PUT' : 'POST';
      const url = mode === 'edit'
        ? `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/admin/products`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          imageUrl: finalImageUrl,
          language,
          isFeatured,
          gammeId,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success(`Produit ${mode === 'edit' ? 'modifié' : 'créé'} avec succès.`);
      router.push(`/${lang}/admin/products`);
    } catch (err) {
      toast.error(`Erreur lors de la ${mode === 'edit' ? 'modification' : 'création'} du produit.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid gap-2">
        <Label>Nom</Label>
        <Input name="name" value={form.name} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label>Description</Label>
        <Textarea name="description" value={form.description} onChange={handleChange} rows={4} />
      </div>
      <div className="grid gap-2">
        <Label>Langue</Label>
        <select name="language" value={form.language} onChange={handleChange} className="input">
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label>Image</Label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        {form.imageUrl && <img src={form.imageUrl} alt="Current" className="w-32 mt-2 rounded" />}
      </div>
      <div className="grid gap-2">
        <Label>Gamme</Label>
        <select name="gammeId" value={form.gammeId} onChange={handleChange} className="input">
          <option value="">Sélectionnez une gamme</option>
          {gammes.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
        <Label>Produit en vedette</Label>
      </div>
      <Button disabled={loading} onClick={handleSubmit}>
        {loading ? 'Envoi…' : mode === 'edit' ? 'Modifier le produit' : 'Créer le produit'}
      </Button>
    </div>
  );
}
