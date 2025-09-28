import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Upload, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

export function VerifyContent({ isDark }: { isDark: boolean }) {
  const [textContent, setTextContent] = useState('')
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeContent = () => {
    setIsAnalyzing(true)
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        trustScore: 74,
        verdict: 'Partially Verified',
        confidence: 87,
        sources: [
          { name: 'Reuters', credibility: 95, status: 'verified' },
          { name: 'Associated Press', credibility: 93, status: 'verified' },
          { name: 'Unknown Blog', credibility: 23, status: 'unreliable' }
        ],
        flags: [
          'Emotional language detected',
          'Missing primary sources',
          'Partially contradicted by fact-checkers'
        ]
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-white">Verify Content</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Analyze text, images, and videos for authenticity</p>
        </div>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-200 dark:bg-slate-800 border border-blue-200/50 dark:border-purple-500/30">
          <TabsTrigger 
            value="text" 
            className="data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="hidden xs:inline">Text</span>
          </TabsTrigger>
          <TabsTrigger 
            value="image"
            className="data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="hidden xs:inline">Image</span>
          </TabsTrigger>
          <TabsTrigger 
            value="video"
            className="data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm"
          >
            <Video className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="hidden xs:inline">Video</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4 lg:space-y-6">
          <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
            <h3 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 sm:mb-4">Text Analysis</h3>
            <Textarea
              placeholder="Paste the text content you want to verify..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="min-h-32 bg-gray-100 dark:bg-slate-800 border-blue-200/50 dark:border-purple-500/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
            />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-4 space-y-2 sm:space-y-0">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {textContent.length}/5000 characters
              </span>
              <Button 
                onClick={analyzeContent}
                disabled={!textContent.trim() || isAnalyzing}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700"
                size="sm"
              >
                {isAnalyzing ? (
                  <>
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                    <span className="text-xs sm:text-sm">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Analyze Content</span>
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <Card className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
              <h3 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 sm:mb-4">Analysis Results</h3>
              
              {/* Trust Score */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-center">
                  <div className="text-3xl text-blue-600 dark:text-cyan-400 mb-1">{analysisResult.trustScore}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Trust Score</div>
                  <Progress value={analysisResult.trustScore} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <Badge 
                    variant="outline" 
                    className="text-lg py-2 px-4 border-orange-500 text-orange-600 dark:text-orange-400"
                  >
                    {analysisResult.verdict}
                  </Badge>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Verdict</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-green-600 dark:text-green-400 mb-1">{analysisResult.confidence}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Confidence</div>
                  <Progress value={analysisResult.confidence} className="mt-2 h-2" />
                </div>
              </div>

              {/* Source Analysis */}
              <div className="mb-6">
                <h4 className="text-gray-900 dark:text-white mb-3">Source Credibility</h4>
                <div className="space-y-2">
                  {analysisResult.sources.map((source: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {source.status === 'verified' ? (
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                        <span className="text-gray-900 dark:text-white">{source.name}</span>
                      </div>
                      <Badge 
                        variant={source.credibility > 80 ? "default" : "destructive"}
                        className={source.credibility > 80 ? "bg-green-600" : ""}
                      >
                        {source.credibility}% credible
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div>
                <h4 className="text-gray-900 dark:text-white mb-3">Content Flags</h4>
                <div className="space-y-2">
                  {analysisResult.flags.map((flag: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="image" className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4">Image Verification</h3>
            <div className="border-2 border-dashed border-blue-200/50 dark:border-purple-500/30 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">Drag and drop an image or click to upload</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Supports JPG, PNG, WebP up to 10MB</p>
              <Button variant="outline" className="mt-4 border-blue-500/50 dark:border-purple-500/50 text-blue-600 dark:text-purple-400">
                Choose File
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 border-blue-200/50 dark:border-purple-500/30">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4">Video Analysis</h3>
            <div className="border-2 border-dashed border-blue-200/50 dark:border-purple-500/30 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">Upload a video for deepfake detection</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Supports MP4, WebM up to 100MB</p>
              <Button variant="outline" className="mt-4 border-blue-500/50 dark:border-purple-500/50 text-blue-600 dark:text-purple-400">
                Choose File
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}