'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react'
import { uploadBlogImage, deleteBlogImage, type ImageUploadResult } from '@/lib/images'

interface BlogImageUploadProps {
  slug: string
  currentImageUrl?: string | null
  onImageUpdate: (imageUrl: string | null) => void
  disabled?: boolean
}

export default function BlogImageUpload({ 
  slug, 
  currentImageUrl, 
  onImageUpdate, 
  disabled = false 
}: BlogImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<ImageUploadResult | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file || uploading) return

    setUploading(true)
    setUploadResult(null)

    try {
      const result = await uploadBlogImage(file, slug)
      setUploadResult(result)

      if (!result.error && result.url) {
        onImageUpdate(result.url)
      }
    } catch (error) {
      setUploadResult({
        url: '',
        path: '',
        error: error instanceof Error ? error.message : 'Upload failed'
      })
    } finally {
      setUploading(false)
    }
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)

    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemoveImage = async () => {
    if (!currentImageUrl) return

    setUploading(true)
    try {
      // If there's an upload result, delete from storage
      if (uploadResult?.path) {
        await deleteBlogImage(uploadResult.path)
        setUploadResult(null)
      }
      // Always update database to remove the image URL
      onImageUpdate(null)
    } catch (error) {
      console.error('Failed to remove image:', error)
    } finally {
      setUploading(false)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-design4-ink">
          Featured Image
        </label>
        {currentImageUrl && (
          <button
            onClick={handleRemoveImage}
            disabled={uploading || disabled}
            className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            Remove Image
          </button>
        )}
      </div>

      {/* Current Image Preview */}
      {currentImageUrl && (
        <div className="relative rounded-lg overflow-hidden border border-design4-neutral-200">
          <img
            src={currentImageUrl}
            alt="Current featured image"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={openFileDialog}
              disabled={uploading || disabled}
              className="bg-white/90 text-design4-ink px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors disabled:opacity-50"
            >
              Replace Image
            </button>
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!currentImageUrl && (
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${dragOver 
              ? 'border-design4-primary bg-design4-primary/5' 
              : 'border-design4-neutral-300 hover:border-design4-primary/50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-design4-primary mb-2"></div>
              <p className="text-sm text-design4-neutral-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-design4-neutral-400 mb-2" />
              <p className="text-sm font-medium text-design4-ink mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-design4-neutral-500">
                PNG, JPG, WebP, SVG up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={uploading || disabled}
      />

      {/* Upload Result Messages */}
      {uploadResult && (
        <div className={`
          flex items-center gap-2 p-3 rounded-lg text-sm
          ${uploadResult.error 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
          }
        `}>
          {uploadResult.error ? (
            <>
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{uploadResult.error}</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>Image uploaded successfully!</span>
            </>
          )}
        </div>
      )}

      {/* Usage Instructions */}
      <div className="text-xs text-design4-neutral-500 bg-design4-neutral-50 p-3 rounded-lg">
        <p className="font-medium mb-1">💡 Image Guidelines:</p>
        <ul className="space-y-1">
          <li>• Use high-quality images (recommended: 1200x800px)</li>
          <li>• Keep file size under 5MB for optimal loading</li>
          <li>• WebP format provides the best compression</li>
          <li>• Images are automatically optimized for different screen sizes</li>
        </ul>
      </div>
    </div>
  )
}