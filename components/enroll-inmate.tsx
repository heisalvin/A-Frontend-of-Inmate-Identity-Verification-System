"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Camera, CheckCircle, User } from "lucide-react"
import type { Page } from "@/app/page"

interface EnrollInmateProps {
  onNavigate: (page: Page) => void
}

export function EnrollInmate({ onNavigate }: EnrollInmateProps) {
  const [formData, setFormData] = useState({
    name: "",
    inmateId: "",
    age: "", // Added age field
    crime: "",
    legalStatus: "",
    sentenceDuration: "",
    prisonName: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        inmateId: "",
        age: "", // Reset age field
        crime: "",
        legalStatus: "",
        sentenceDuration: "",
        prisonName: "",
      })
      setImageFile(null)
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800">Inmate Enrolled Successfully!</h3>
              <p className="text-green-700">
                {formData.name} (Age: {formData.age}) has been successfully enrolled in the system.
                <br />
                Inmate ID: <strong>{formData.inmateId}</strong>
                <br />
                <span className="text-sm">Enrolled at: {new Date().toLocaleString()}</span>
              </p>
              <Button onClick={() => onNavigate("dashboard")} className="mt-4">
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enroll New Inmate</h1>
          <p className="text-gray-600">Add a new inmate to the verification system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inmate Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Inmate Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inmateId">Inmate ID *</Label>
                  <Input
                    id="inmateId"
                    value={formData.inmateId}
                    onChange={(e) => handleInputChange("inmateId", e.target.value)}
                    placeholder="INM-2024-XXX"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Enter age"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crime">Crime/Charges</Label>
                <Textarea
                  id="crime"
                  value={formData.crime}
                  onChange={(e) => handleInputChange("crime", e.target.value)}
                  placeholder="Enter crime details and charges"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="legalStatus">Legal Status *</Label>
                  <Select
                    value={formData.legalStatus}
                    onValueChange={(value) => handleInputChange("legalStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select legal status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awaiting-trial">Awaiting Trial</SelectItem>
                      <SelectItem value="convicted">Convicted</SelectItem>
                      <SelectItem value="sentenced">Sentenced</SelectItem>
                      <SelectItem value="parole">On Parole</SelectItem>
                      <SelectItem value="probation">On Probation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sentenceDuration">Sentence Duration</Label>
                  <Input
                    id="sentenceDuration"
                    value={formData.sentenceDuration}
                    onChange={(e) => handleInputChange("sentenceDuration", e.target.value)}
                    placeholder="e.g., 5 years, Life, 18 months"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prisonName">Prison/Facility Name *</Label>
                <Input
                  id="prisonName"
                  value={formData.prisonName}
                  onChange={(e) => handleInputChange("prisonName", e.target.value)}
                  placeholder="Enter prison or facility name"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Upload */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Facial Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imageFile ? (
                  <div className="space-y-2">
                    <img
                      src={URL.createObjectURL(imageFile) || "/placeholder.svg"}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                    <p className="text-sm text-gray-600">{imageFile.name}</p>
                    <Button type="button" variant="outline" size="sm" onClick={() => setImageFile(null)}>
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Upload facial image</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />

              <div className="space-y-2">
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Image File
                    </span>
                  </Button>
                </Label>

                <Button type="button" variant="outline" className="w-full bg-transparent">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture from Webcam
                </Button>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>• Ensure clear, front-facing photo</p>
                <p>• Good lighting conditions</p>
                <p>• No obstructions (glasses, hat)</p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !formData.name || !formData.inmateId || !imageFile}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Enrolling...</span>
              </div>
            ) : (
              "Enroll Inmate"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
