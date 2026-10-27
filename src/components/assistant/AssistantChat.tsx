import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Languages,
  BookOpen,
  Info
} from 'lucide-react';
import { AssistantMessage, LanguageMode } from '../../types';
import { KNOWLEDGE_BASE, KnowledgeEntry } from '../../data/assistantData';
import { useLanguage } from '../../context/LanguageContext';

export const AssistantChat: React.FC = () => {
  const { language: appLang } = useLanguage();
  const [chatLang, setChatLang] = useState<LanguageMode>(appLang);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      content:
        chatLang === 'hi'
          ? 'नमस्ते! मैं CuraGuide शैक्षिक स्वास्थ्य सहायक हूँ। मैं दवाओं के पत्तों (लीफलेट्स) को समझने, जेनेरिक बनाम ब्रांडेड दवाओं के अंतर और बुनियादी स्वास्थ्य शब्दावली में आपकी सहायता कर सकता हूँ। मैं एक डॉक्टर नहीं हूँ। आज आप क्या जानना चाहते हैं?'
          : 'Hello! I am your CuraGuide Healthcare Information Assistant. I can help you understand medicine leaflets, compare generic versus brand formulations, and clarify standard medical terms. Please note: I am an educational tool, not a doctor. How can I assist you today?',
      timestamp: 'Just now',
      language: chatLang,
      suggestedFollowUps:
        chatLang === 'hi'
          ? [
              'जेनेरिक और ब्रांडेड दवाओं में क्या अंतर होता है?',
              'दवा का लीफलेट और एक्सपायरी डेट कैसे पढ़ें?',
              'यदि कोई खुराक छूट जाए तो क्या करें?'
            ]
          : [
              'What is the difference between generic and brand medicines?',
              'How do I safely read a medicine leaflet and label?',
              'What is the standard protocol if a dose is missed?'
            ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Keep chat language aligned with app language toggle if desired, but allow manual toggle
  const handleToggleChatLang = () => {
    const nextLang = chatLang === 'en' ? 'hi' : 'en';
    setChatLang(nextLang);
    const greeting =
      nextLang === 'hi'
        ? 'भाषा बदलकर हिंदी कर दी गई है। आप नीचे दिए गए सुझावों में से चुन सकते हैं या अपना प्रश्न टाइप कर सकते हैं।'
        : 'Switched assistant language to English. You can select one of the suggested prompts or type your query.';
    setMessages(prev => [
      ...prev,
      {
        id: `lang-switch-${Date.now()}`,
        sender: 'system',
        content: greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: nextLang
      }
    ]);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: AssistantMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: chatLang
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Process answer from verified knowledge base
    setTimeout(() => {
      respondToQuery(text);
    }, 400);
  };

  const respondToQuery = (query: string) => {
    const lower = query.toLowerCase();

    // Check for diagnostic or prescriptive queries
    const clinicalRiskWords = ['diagnose', 'prescribe', 'dose for me', 'how many pills', 'cure', 'should i stop', 'इलाज', 'रोग', 'बीमारी'];
    const isRisky = clinicalRiskWords.some(w => lower.includes(w));

    // Search knowledge base
    const matched = KNOWLEDGE_BASE.find(entry =>
      entry.keywords.some(k => lower.includes(k.toLowerCase())) ||
      entry.questionEn.toLowerCase().includes(lower) ||
      entry.questionHi.toLowerCase().includes(lower)
    );

    let replyContent = '';
    let refLink: string | undefined;

    if (isRisky && !matched) {
      replyContent =
        chatLang === 'hi'
          ? '⚠️ **महत्वपूर्ण चिकित्सा चेतावनी:** CuraGuide एक शैक्षिक और जानकारीपूर्ण प्रोटोटाइप है। हम किसी बीमारी का निदान (Diagnosis), व्यक्तिगत खुराक की गणना, या नुस्खे (Prescription) में बदलाव की सलाह नहीं दे सकते। कृपया तुरंत किसी योग्य चिकित्सक या आपातकालीन स्वास्थ्य केंद्र से संपर्क करें।'
          : '⚠️ **Clinical Safety Warning:** CuraGuide is an informational educational prototype. We cannot diagnose conditions, calculate personalized drug doses, or prescribe alterations to your doctor’s treatment regimen. Please consult a qualified licensed physician or contact emergency medical services directly.';
    } else if (matched) {
      replyContent = chatLang === 'hi' ? matched.responseHi : matched.responseEn;
      if (matched.referenceLink) {
        refLink = `${matched.referenceLink.label}: ${matched.referenceLink.url}`;
      }
    } else {
      replyContent =
        chatLang === 'hi'
          ? 'मैं एक पूर्व-निर्धारित शैक्षिक स्वास्थ्य मॉडल पर आधारित हूँ। इस विशिष्ट प्रश्न का उत्तर मेरे वर्तमान डेटाबेस में उपलब्ध नहीं है। आप जेनेरिक दवाओं, दवा के पत्तों (लीफलेट्स) को पढ़ने, या दवाइयों के रख-रखाव से जुड़े प्रश्न पूछ सकते हैं।'
          : 'I am an educational healthcare knowledge assistant configured with verified formulary guidance. I could not locate a pre-verified match for this exact phrase. Please try asking about generic bioequivalence, reading medicine packaging/leaflets, medication storage rules, or missed dose protocols.';
    }

    const assistantReply: AssistantMessage = {
      id: `msg-resp-${Date.now()}`,
      sender: 'assistant',
      content: replyContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: chatLang,
      sourceReference: refLink,
      suggestedFollowUps:
        chatLang === 'hi'
          ? [
              'दवाओं के सही रख-रखाव (स्टोरेज) के नियम क्या हैं?',
              'दवा के पत्तों पर लाल लकीर (Red Line) का क्या मतलब है?'
            ]
          : [
              'What are proper storage rules for medicines?',
              'What does a red line on a medicine package mean?'
            ]
    };

    setMessages(prev => [...prev, assistantReply]);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `msg-init-${Date.now()}`,
        sender: 'assistant',
        content:
          chatLang === 'hi'
            ? 'चैट रीसेट कर दी गई है। आज आप क्या जानना चाहते हैं?'
            : 'Chat refreshed. How can I help you understand your medicine information today?',
        timestamp: 'Just now',
        language: chatLang,
        suggestedFollowUps:
          chatLang === 'hi'
            ? [
                'जेनेरिक और ब्रांडेड दवाओं में क्या अंतर होता है?',
                'दवा का लीफलेट और एक्सपायरी डेट कैसे पढ़ें?'
              ]
            : [
                'What is the difference between generic and brand medicines?',
                'How do I safely read a medicine leaflet and label?'
              ]
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[520px] bg-white dark:bg-[#132235] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
      {/* Assistant Header */}
      <div className="px-5 py-3.5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0D9488] text-white flex items-center justify-center shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#102A43] dark:text-white">
                CuraGuide Health Companion
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-[#0D9488] dark:bg-teal-950/70 dark:text-teal-300">
                Verified Info Only
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {chatLang === 'hi' ? 'द्विभाषी शैक्षिक सहायक' : 'Bilingual Educational Assistant'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleChatLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-teal-500 transition-colors shadow-sm"
            title="Toggle English / Hindi language"
          >
            <Languages className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>{chatLang === 'hi' ? 'हिंदी (Active)' : 'English (Active)'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mandatory Disclaimer Ribbon */}
      <div className="px-4 py-2 bg-amber-50/90 dark:bg-amber-950/40 border-b border-amber-200/80 dark:border-amber-900/40 flex items-center gap-2 text-[11px] text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        <span>
          <strong>Medical Notice:</strong> This assistant provides verified educational summaries from public formularies. It does not replace consultation with a qualified doctor.
        </span>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map(msg => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  {msg.content}
                </span>
              </div>
            );
          }

          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  isUser
                    ? 'bg-[#102A43] dark:bg-slate-700 text-white'
                    : 'bg-[#0D9488] text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#0D9488] text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-[#0D1826] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line prose prose-sm dark:prose-invert">
                  {msg.content}
                </div>

                {msg.sourceReference && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/80 text-[11px] text-teal-700 dark:text-teal-300">
                    <span className="font-semibold">Reference Link: </span>
                    <a
                      href={msg.sourceReference.split(': ')[1]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium hover:text-teal-900 dark:hover:text-teal-100"
                    >
                      {msg.sourceReference.split(': ')[0]}
                    </a>
                  </div>
                )}

                <div
                  className={`mt-1.5 text-[10px] ${
                    isUser ? 'text-teal-100 text-right' : 'text-slate-400 text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>

                {/* Suggested follow-ups */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-1.5">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((question, qIdx) => (
                        <button
                          key={qIdx}
                          type="button"
                          onClick={() => handleSendMessage(question)}
                          className="text-left text-xs bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/50 text-[#0D9488] dark:text-teal-300 border border-teal-200 dark:border-teal-800 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#101D2D]">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={
              chatLang === 'hi'
                ? 'दवा के लीफलेट या शब्दावली के बारे में पूछें...'
                : 'Ask about generic bioequivalence, leaflets, or medical terms...'
            }
            className="flex-1 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 bg-slate-50 dark:bg-[#132235] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 disabled:opacity-40 disabled:hover:bg-[#0D9488] text-white transition-colors shadow-sm"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
