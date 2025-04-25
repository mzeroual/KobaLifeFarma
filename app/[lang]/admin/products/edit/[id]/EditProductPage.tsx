"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { withAuth } from "@/hooks/use-auth"
import { adminProductsAPI, uploadAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import Link from "next/link"

interface FormData {
  name: string
  description: string
  shortDescription: string
  category: string
  brand: string
  imageUrl: string
  language: string
  gammeId: string
}

function EditProductPageContent() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    shortDescription: "",
    category: "",
    brand: "",
    imageUrl: "",
    language: "",
    gammeId: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await adminProductsAPI.getById(productId)
        const product = response.data

        setFormData({
          name: product.name || "",
          description: product.description || "",
          shortDescription: product.shortDescription || "",
          category: product.category || "",
          brand: product.brand || "",
          imageUrl: product.imageUrl || "",
          language: product.language || "fr",
          gammeId: product.gammeId || "",
        })

        if (product.imageUrl) {
          setPreview(product.imageUrl)
        }
      } catch (err) {
        console.error("Failed to fetch product:", err)
        setError("Failed to load product data.")
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) fetchProduct()
  }, [productId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return null
    try {
      setIsUploading(true)
      const response = await uploadAPI.uploadImage(file)
      return response.data.url
    } catch (err) {
      console.error("Upload failed:", err)
      setError("Failed to upload image.")
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      let uploadedImageUrl = formData.imageUrl
      if (file) {
        const imageUrl = await handleUpload()
        if (!imageUrl) return setIsSubmitting(false)
        uploadedImageUrl = imageUrl
      }

      await adminProductsAPI.update(productId, {
        ...formData,
        imageUrl: uploadedImageUrl,
      })

      router.push("/admin/dashboard")
    } catch (err) {
      console.error("Failed to update product:", err)
      setError("Failed to update product.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-emerald-900">Edit Product</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Update product details</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" value={formData.brand} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={formData.category} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={formData.language} onValueChange={(value) => handleSelectChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gammeId">Gamme ID</Label>
                <Input id="gammeId" name="gammeId" value={formData.gammeId} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image Upload</Label>
                <div className="flex items-center gap-4">
                  <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
                  {file && (
                    <Button type="button" onClick={handleUpload} disabled={isUploading} variant="outline">
                      {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                      Upload
                    </Button>
                  )}
                </div>
                {preview && (
                  <div className="mt-2 w-32 h-32 border rounded overflow-hidden">
                    <img src={preview} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(EditProductPageContent)
