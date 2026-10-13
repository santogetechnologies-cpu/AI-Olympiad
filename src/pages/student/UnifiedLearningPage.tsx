import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLessonContent, useLevelManifest, useLevelsConfig } from '../../hooks/useContentLoader'
import { ArrowLeft, BookOpen, Clock, CheckCircle2, ChevronRight } from 'lucide-react'

interface RouteParams {
  level?: string
  classId?: string
  chapterId?: string
  lessonId?: string
}

export default function UnifiedLearningPage() {
  const { level = 'junior', classId, chapterId, lessonId } = useParams<Record<string, string>>()
  const navigate = useNavigate()
  
  const levelsConfig = useLevelsConfig()
  const manifest = useLevelManifest(level)
  const [selectedClass, setSelectedClass] = useState(classId || '')
  const [selectedChapter, setSelectedChapter] = useState(chapterId || '')
  const [selectedLesson, setSelectedLesson] = useState(lessonId || '')
  
  // Build filename from selections
  const filename = selectedLesson ? `${level}-${selectedClass}-${selectedChapter}-${selectedLesson}.json` : ''
  const lesson = useLessonContent(level, filename)

  // Auto-select first available if nothing selected
  useEffect(() => {
    if (manifest && !selectedClass) {
      const firstClass = manifest.classes[0]
      if (firstClass) {
        setSelectedClass(firstClass.classId)
        const firstChapter = firstClass.chapters[0]
        if (firstChapter) {
          setSelectedChapter(firstChapter.chapterId)
          const firstLesson = firstChapter.lessons[0]
          if (firstLesson) {
            setSelectedLesson(firstLesson.lessonId)
          }
        }
      }
    }
  }, [manifest, selectedClass])

  if (!levelsConfig || !manifest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  const currentClass = manifest.classes.find(c => c.classId === selectedClass)
  const currentChapter = currentClass?.chapters.find(ch => ch.chapterId === selectedChapter)
  const currentLessonInfo = currentChapter?.lessons.find(l => l.lessonId === selectedLesson)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/student')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{manifest.levelName}</h1>
                <p className="text-sm text-gray-600">{currentClass?.className}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-3 space-y-4">
            {/* Class Selector */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Classes</h3>
              <div className="space-y-2">
                {manifest.classes.map((cls) => (
                  <button
                    key={cls.classId}
                    onClick={() => {
                      setSelectedClass(cls.classId)
                      setSelectedChapter(cls.chapters[0]?.chapterId || '')
                      setSelectedLesson(cls.chapters[0]?.lessons[0]?.lessonId || '')
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedClass === cls.classId
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {cls.className}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter & Lesson Selector */}
            {currentClass && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Chapters</h3>
                <div className="space-y-3">
                  {currentClass.chapters.map((chapter) => (
                    <div key={chapter.chapterId}>
                      <button
                        onClick={() => {
                          setSelectedChapter(chapter.chapterId)
                          setSelectedLesson(chapter.lessons[0]?.lessonId || '')
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                          selectedChapter === chapter.chapterId
                            ? 'bg-purple-50 text-purple-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm">{chapter.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      {selectedChapter === chapter.chapterId && (
                        <div className="ml-4 mt-2 space-y-1">
                          {chapter.lessons.map((les) => (
                            <button
                              key={les.lessonId}
                              onClick={() => setSelectedLesson(les.lessonId)}
                              className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                                selectedLesson === les.lessonId
                                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {les.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {lesson ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Lesson Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                  <div className="flex items-center gap-2 text-indigo-100 mb-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {currentChapter?.title}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3">{lesson.title}</h2>
                  <div className="flex items-center gap-4 text-indigo-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{lesson.introduction.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">{lesson.introduction.learningObjectives.length} Learning Objectives</span>
                    </div>
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="p-6 space-y-8">
                  {/* Introduction */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Introduction</h3>
                    <p className="text-gray-700 leading-relaxed">{lesson.introduction.overview}</p>
                    
                    <div className="mt-4 bg-indigo-50 rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-900 mb-2">Learning Objectives</h4>
                      <ul className="space-y-2">
                        {lesson.introduction.learningObjectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-indigo-700">
                            <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sections */}
                  {lesson.sections.map((section, idx) => (
                    <div key={section.sectionId} className="border-t border-gray-200 pt-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {idx + 1}. {section.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                      
                      {/* Examples */}
                      {section.examples && section.examples.length > 0 && (
                        <div className="space-y-4 mb-4">
                          {section.examples.map((example, exIdx) => (
                            <div key={exIdx} className="bg-purple-50 rounded-lg p-4">
                              <h4 className="font-semibold text-purple-900 mb-2">{example.title}</h4>
                              <p className="text-purple-800 mb-2">{example.description}</p>
                              {example.realLifeScenario && (
                                <div className="mt-2 pl-4 border-l-2 border-purple-300">
                                  <p className="text-sm text-purple-700 italic">{example.realLifeScenario}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Key Points */}
                      {section.keyPoints && section.keyPoints.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Key Points</h4>
                          <ul className="space-y-1">
                            {section.keyPoints.map((point, ptIdx) => (
                              <li key={ptIdx} className="flex items-start gap-2 text-gray-700">
                                <span className="text-indigo-600 font-bold">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Activities */}
                  {lesson.activities && lesson.activities.length > 0 && (
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Activities</h3>
                      <div className="space-y-4">
                        {lesson.activities.map((activity) => (
                          <div key={activity.activityId} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                            <h4 className="font-semibold text-yellow-900 mb-2">{activity.title}</h4>
                            <p className="text-yellow-800 mb-3">{activity.description}</p>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-yellow-900">Instructions:</p>
                              <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
                                {activity.instructions.map((inst, idx) => (
                                  <li key={idx}>{inst}</li>
                                ))}
                              </ol>
                            </div>
                            <div className="mt-3 flex items-center gap-4 text-sm text-yellow-700">
                              <span>📦 Materials: {activity.materials}</span>
                              <span>⏱️ Duration: {activity.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="border-t border-gray-200 pt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Summary</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{lesson.summary.recap}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Takeaways</h4>
                      <ul className="space-y-2">
                        {lesson.summary.keyTakeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Lesson</h3>
                <p className="text-gray-600">Choose a class, chapter, and lesson from the sidebar to begin learning.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
