"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Camera, Upload, Play, Square, CheckCircle, XCircle } from "lucide-react"
import type { Page } from "@/app/page"

interface VerifyInmateProps {
  onNavigate: (page: Page) => void
}

interface VerificationResult {
  success: boolean
  inmateId: string
  name: string
  confidence: number
  sentence: string
  lastVerified: string
  crime: string
  legalStatus: string
  cosineSimilarity?: number
  usedFallback?: boolean
}

export function VerifyInmate({ onNavigate }: VerifyInmateProps) {
  const [isWebcamActive, setIsWebcamActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      setVerificationResult(null)
    }
  }

  const startWebcam = () => {
    setIsWebcamActive(true)
    setUploadedImage(null)
    setVerificationResult(null)
  }

  const stopWebcam = () => {
    setIsWebcamActive(false)
  }

  const handleVerification = async () => {
    setIsVerifying(true)

    // Simulate API call with realistic timing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate cosine similarity score between 0.80 and 0.99
    const cosineSimilarity = (Math.random() * 0.19 + 0.8).toFixed(3)
    const confidence = Math.floor(Number.parseFloat(cosineSimilarity) * 100)
    const isSuccess = Number.parseFloat(cosineSimilarity) > 0.87
    const useFallback = Number.parseFloat(cosineSimilarity) < 0.85

    // Mock inmate data for successful matches
    const mockInmates = [
      {
        inmateId: "INM-2024-001",
        name: "John Smith",
        crime: "Armed Robbery, Assault with Deadly Weapon",
        legalStatus: "Convicted",
        sentence: "8 years",
        lastVerified: new Date().toLocaleString(),
      },
      {
        inmateId: "INM-2024-002",
        name: "Michael Brown",
        crime: "Drug Trafficking",
        legalStatus: "Sentenced",
        sentence: "5 years",
        lastVerified: new Date().toLocaleString(),
      },
      {
        inmateId: "INM-2024-003",
        name: "Robert Johnson",
        crime: "Fraud, Money Laundering",
        legalStatus: "Convicted",
        sentence: "3 years",
        lastVerified: new Date().toLocaleString(),
      },
      {
        inmateId: "INM-2024-004",
        name: "David Wilson",
        crime: "Assault",
        legalStatus: "Awaiting Trial",
        sentence: "18 months",
        lastVerified: new Date().toLocaleString(),
      },
    ]

    const mockResult: VerificationResult = isSuccess
      ? {
          success: true,
          ...mockInmates[Math.floor(Math.random() * mockInmates.length)],
          confidence: confidence,
          cosineSimilarity: Number.parseFloat(cosineSimilarity),
          usedFallback: useFallback,
        }
      : {
          success: false,
          inmateId: "",
          name: "",
          confidence: confidence,
          sentence: "",
          lastVerified: "",
          crime: "",
          legalStatus: "",
          cosineSimilarity: Number.parseFloat(cosineSimilarity),
          usedFallback: useFallback,
        }

    setVerificationResult(mockResult)
    setIsVerifying(false)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verify Inmate Identity</h1>
          <p className="text-gray-600">Use facial recognition to verify inmate identity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera/Upload Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Capture or Upload Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Webcam Preview */}
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                {isWebcamActive ? (
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-sm font-medium">Webcam Active</p>
                    <p className="text-xs text-gray-500">Position face in center of frame</p>
                  </div>
                ) : uploadedImage ? (
                  <img
                    src={URL.createObjectURL(uploadedImage) || "/placeholder.svg"}
                    alt="Uploaded"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center space-y-2">
                    <Camera className="mx-auto h-16 w-16 text-gray-400" />
                    <p className="text-sm font-medium text-gray-600">No image selected</p>
                    <p className="text-xs text-gray-500">Start webcam or upload an image</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={isWebcamActive ? stopWebcam : startWebcam}
                  variant={isWebcamActive ? "destructive" : "default"}
                  className="flex items-center space-x-2"
                >
                  {isWebcamActive ? (
                    <>
                      <Square className="h-4 w-4" />
                      <span>Stop Camera</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Start Camera</span>
                    </>
                  )}
                </Button>

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="verify-image-upload"
                  />
                  <Button variant="outline" className="w-full flex items-center space-x-2 bg-transparent" asChild>
                    <label htmlFor="verify-image-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4" />
                      <span>Upload Image</span>
                    </label>
                  </Button>
                </div>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerification}
                disabled={(!isWebcamActive && !uploadedImage) || isVerifying}
                className="w-full"
                size="lg"
              >
                {isVerifying ? "Verifying..." : "Match Face"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {verificationResult?.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : verificationResult && !verificationResult.success ? (
                  <XCircle className="h-5 w-5 text-red-600" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
                <span>Verification Result</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isVerifying ? (
                <div className="text-center py-8 space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-600">Processing facial recognition...</p>
                </div>
              ) : verificationResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Match Status:</span>
                    <Badge
                      variant={verificationResult.success ? "default" : "destructive"}
                      className={
                        verificationResult.success
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {verificationResult.success ? "MATCH FOUND" : "NO MATCH FOUND"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cosine Similarity:</span>
                    <span
                      className={`font-bold ${
                        verificationResult.cosineSimilarity >= 0.9
                          ? "text-green-600"
                          : verificationResult.cosineSimilarity >= 0.85
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {verificationResult.cosineSimilarity?.toFixed(3)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Confidence Score:</span>
                    <span
                      className={`font-bold ${
                        verificationResult.confidence >= 90
                          ? "text-green-600"
                          : verificationResult.confidence >= 85
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {verificationResult.confidence}%
                    </span>
                  </div>

                  {verificationResult.usedFallback && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-yellow-800 font-medium">
                          Fallback model (FaceNet) used for low-confidence detection
                        </span>
                      </div>
                    </div>
                  )}

                  {verificationResult.success ? (
                    <>
                      <hr className="my-4" />
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Inmate ID:</span>
                          <p className="font-mono text-sm">{verificationResult.inmateId}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Name:</span>
                          <p className="font-semibold">{verificationResult.name}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Crime:</span>
                          <p className="text-sm">{verificationResult.crime}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Legal Status:</span>
                          <Badge variant="outline">{verificationResult.legalStatus}</Badge>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Sentence:</span>
                          <p className="text-sm">{verificationResult.sentence}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Last Verified:</span>
                          <p className="text-sm text-gray-500">{verificationResult.lastVerified}</p>
                        </div>
                      </div>

                      <Button onClick={() => onNavigate("history")} variant="outline" className="w-full mt-4">
                        View Full History
                      </Button>
                    </>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <XCircle className="mx-auto h-8 w-8 text-red-600 mb-2" />
                      <p className="text-red-800 font-medium">No matching inmate found in database</p>
                      <p className="text-red-600 text-sm mt-1">
                        Please try with a different image or contact administrator
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Camera className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-sm">Start verification to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
