import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import portfolioDataDefault from '../data/portfolio.json';
import HeroForm from '../components/admin/HeroForm';
import AboutForm from '../components/admin/AboutForm';
import ExperienceForm from '../components/admin/ExperienceForm';
import SkillsForm from '../components/admin/SkillsForm';
import EducationForm from '../components/admin/EducationForm';
import ContactForm from '../components/admin/ContactForm';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [saveStatus, setSaveStatus] = useState('');
  const [editMode, setEditMode] = useState('form'); // 'form' or 'json'
  const [jsonData, setJsonData] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  // Simple password (you can change this)
  const ADMIN_PASSWORD = '1422002';

  useEffect(() => {
    // Load portfolio data from localStorage or default
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setPortfolioData(data);
        setJsonData(JSON.stringify(data[activeTab], null, 2));
      } catch (err) {
        console.error('Error loading saved data:', err);
        setPortfolioData(portfolioDataDefault);
        setJsonData(JSON.stringify(portfolioDataDefault[activeTab], null, 2));
      }
    } else {
      setPortfolioData(portfolioDataDefault);
      setJsonData(JSON.stringify(portfolioDataDefault[activeTab], null, 2));
    }
  }, [activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleSave = (section, data) => {
    const updatedData = {
      ...portfolioData,
      [section]: data
    };
    
    setPortfolioData(updatedData);
    localStorage.setItem('portfolioData', JSON.stringify(updatedData));
    
    setSaveStatus('✓ Saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setSaveStatus('✓ JSON file downloaded successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleCopyJSON = () => {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    navigator.clipboard.writeText(dataStr).then(() => {
      setSaveStatus('✓ JSON copied to clipboard!');
      setTimeout(() => setSaveStatus(''), 3000);
    }).catch(() => {
      setSaveStatus('✗ Failed to copy. Please try download instead.');
      setTimeout(() => setSaveStatus(''), 3000);
    });
  };

  const handleJsonSave = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      handleSave(activeTab, parsedData);
    } catch (error) {
      setSaveStatus('✗ Invalid JSON format!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to original data? This will delete all your changes.')) {
      localStorage.removeItem('portfolioData');
      setPortfolioData(portfolioDataDefault);
      setSaveStatus('✓ Reset to default!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  const renderForm = () => {
    if (!portfolioData) return null;

    switch (activeTab) {
      case 'hero':
        return <HeroForm data={portfolioData.hero} onSave={(data) => handleSave('hero', data)} />;
      case 'about':
        return <AboutForm data={portfolioData.about} onSave={(data) => handleSave('about', data)} />;
      case 'experience':
        return <ExperienceForm data={portfolioData.experience} onSave={(data) => handleSave('experience', data)} />;
      case 'skills':
        return <SkillsForm data={portfolioData.skills} onSave={(data) => handleSave('skills', data)} />;
      case 'education':
        return <EducationForm data={portfolioData.education} onSave={(data) => handleSave('education', data)} />;
      case 'contact':
        return <ContactForm data={portfolioData.contact} onSave={(data) => handleSave('contact', data)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream/30 via-white to-beige/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-charcoal to-charcoal/90 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center text-2xl">
                ⚙️
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Portfolio စီမံခန့်ခွဲမှု</h1>
                <p className="text-cream/70 text-xs sm:text-sm mt-1">သင့် Portfolio အကြောင်းအရာများကို စီမံခန့်ခွဲပါ</p>
              </div>
            </div>
            <button
              onClick={goToHome}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gold/20 hover:bg-gold hover:text-white rounded-xl font-semibold transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Portfolio သို့ ပြန်သွားမည်
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mt-12"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-beige">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-5xl">🔐</div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">ပြန်လည်ကြိုဆိုပါတယ်</h2>
                <p className="text-charcoal/60 text-sm sm:text-base">ဆက်လက်လုပ်ဆောင်ရန် Password ထည့်ပါ</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password ထည့်ပါ"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-beige rounded-xl focus:border-gold outline-none text-base sm:text-lg transition-colors"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-gold to-terracotta text-white rounded-xl font-semibold hover:from-gold/90 hover:to-terracotta/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  🔓 Admin Panel သို့ ဝင်ရောက်မည်
                </button>
                <div className="text-center pt-4 border-t border-beige">
                  {/* <p className="text-xs sm:text-sm text-charcoal/50">
                    Default password: <span className="font-mono bg-beige/50 px-2 py-1 rounded">admin123</span>
                  </p> */}
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Help Guide Section */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl shadow-lg border border-primary/20 overflow-hidden">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📖</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-charcoal text-lg">Admin Panel အသုံးပြုနည်း</h3>
                    <p className="text-sm text-charcoal/60">အဆင့်ဆင့် လမ်းညွှန်ချက်များကို ကြည့်ရှုရန် နှိပ်ပါ</p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-primary transition-transform ${showHelp ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-6 space-y-4"
                >
                  <div className="bg-white rounded-xl p-5 space-y-4">
                    {/* Step 1 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        ၁
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">တည်းဖြတ်မှု ပုံစံ ရွေးချယ်ပါ</h4>
                        <p className="text-sm text-charcoal/70">
                          လွယ်ကူစွာ တည်းဖြတ်ရန် <strong>Form Editor</strong> ကို ရွေးချယ်ပါ။ သို့မဟုတ် အဆင့်မြင့်သုံးစွဲသူများအတွက် <strong>JSON Editor</strong> ကို ရွေးချယ်နိုင်ပါသည်။
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        ၂
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">အပိုင်းတစ်ခု ရွေးချယ်ပါ</h4>
                        <p className="text-sm text-charcoal/70">
                          သင့် Portfolio ၏ အပိုင်းတစ်ခုကို တည်းဖြတ်ရန် Tab များ (Hero, About, Experience, Skills, Education, Contact) ထဲမှ တစ်ခုကို နှိပ်ပါ။
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        ၃
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">အကြောင်းအရာများ တည်းဖြတ်ပါ</h4>
                        <p className="text-sm text-charcoal/70 mb-2">
                          <strong>Form Editor:</strong> စာသားအကွက်များကို ဖြည့်သွင်းပါ။ ခလုတ်များကို အသုံးပြု၍ အရာများကို ထည့်ခြင်း သို့မဟုတ် ဖယ်ရှားခြင်း ပြုလုပ်နိုင်ပါသည်။
                        </p>
                        <p className="text-sm text-charcoal/70">
                          <strong>JSON Editor:</strong> JSON ဒေတာကို တိုက်ရိုက် တည်းဖြတ်ပါ။ မှန်ကန်သော JSON ပုံစံဖြစ်ရန် သေချာပါစေ။
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        ၄
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">ပြောင်းလဲမှုများကို သိမ်းဆည်းပါ</h4>
                        <p className="text-sm text-charcoal/70">
                          Form တစ်ခုချင်းစီ၏ အောက်ခြေတွင်ရှိသော <strong>"Save Changes"</strong> ခလုတ်ကို နှိပ်ပါ။ သင့်ပြောင်းလဲမှုများကို Browser ၏ Local Storage တွင် သိမ်းဆည်းပါမည်။
                        </p>
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        ၅
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">Portfolio ကို ကြည့်ရှုပါ</h4>
                        <p className="text-sm text-charcoal/70">
                          သင့်ပြောင်းလဲမှုများကို Website တွင် တိုက်ရိုက်ကြည့်ရှုရန် <strong>"Back to Portfolio"</strong> ခလုတ်ကို နှိပ်ပါ။
                        </p>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-6 pt-4 border-t border-beige">
                      <h4 className="font-bold text-charcoal mb-3 flex items-center gap-2">
                        <span>💡</span> အသုံးဝင်သော အကြံပြုချက်များ
                      </h4>
                      <ul className="space-y-2 text-sm text-charcoal/70">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>သင့်ပြောင်းလဲမှုများကို Browser တွင် အလိုအလျောက် သိမ်းဆည်းပါသည်။ Refresh လုပ်လျှင်လည်း ပျောက်ဆုံးမည် မဟုတ်ပါ။</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>အမြဲတမ်းသိမ်းဆည်းလိုပါက "Download JSON" ခလုတ်ကို နှိပ်၍ ဖိုင်ကို သိမ်းဆည်းနိုင်ပါသည်။</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>လိုအပ်ပါက အရာအားလုံးကို မူလအတိုင်း ပြန်လည်သတ်မှတ်ရန် <strong>Danger Zone</strong> ကို အသုံးပြုပါ။</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>Experience, Skills နှင့် Education အပိုင်းများတွင် "Add" ခလုတ်များကို အသုံးပြု၍ အရာများစွာ ထည့်သွင်းနိုင်ပါသည်။</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>Icon များသည် Emoji များဖြစ်ပါသည် - သင်နှစ်သက်သော Emoji တစ်ခုခုကို Copy လုပ်၍ Paste လုပ်နိုင်ပါသည်။</span>
                        </li>
                      </ul>
                    </div>

                    {/* Warning */}
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                          <h5 className="font-bold text-yellow-800 mb-1">အရေးကြီးသော မှတ်ချက်</h5>
                          <p className="text-sm text-yellow-700">
                            ပြောင်းလဲမှုများကို Browser ၏ Local Storage တွင် သိမ်းဆည်းထားပါသည်။ Browser Data ကို ရှင်းလင်းလျှင် ပျောက်ဆုံးနိုင်ပါသည်။ အမြဲတမ်းသိမ်းဆည်းလိုပါက JSON ဖိုင်ကို Download လုပ်၍ Backup ယူထားပါ။
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Edit Mode Toggle */}
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-beige/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-charcoal">တည်းဖြတ်မှု ပုံစံ</h3>
                  <p className="text-sm text-charcoal/60">သင် တည်းဖြတ်လိုသော ပုံစံကို ရွေးချယ်ပါ</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditMode('form')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      editMode === 'form'
                        ? 'bg-gradient-to-r from-primary to-primary-dark text-white'
                        : 'bg-beige/30 text-charcoal hover:bg-beige/50'
                    }`}
                  >
                    📝 Form Editor
                  </button>
                  <button
                    onClick={() => setEditMode('json')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      editMode === 'json'
                        ? 'bg-gradient-to-r from-primary to-primary-dark text-white'
                        : 'bg-beige/30 text-charcoal hover:bg-beige/50'
                    }`}
                  >
                    {} JSON Editor
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 border border-beige/50">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { id: 'hero', icon: '🏠', label: 'ပင်မစာမျက်နှာ' },
                  { id: 'about', icon: '👤', label: 'အကြောင်း' },
                  { id: 'experience', icon: '💼', label: 'အတွေ့အကြုံ' },
                  { id: 'skills', icon: '🎯', label: 'ကျွမ်းကျင်မှု' },
                  { id: 'education', icon: '🎓', label: 'ပညာရေး' },
                  { id: 'contact', icon: '📧', label: 'ဆက်သွယ်ရန်' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-gold to-terracotta text-white shadow-lg scale-105'
                        : 'bg-beige/20 text-charcoal hover:bg-gold/20 hover:text-charcoal'
                    }`}
                  >
                    <span className="text-lg sm:text-xl">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status Message */}
            {saveStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 text-green-700 rounded-xl text-center font-semibold shadow-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {saveStatus}
                </div>
              </motion.div>
            )}

            {/* Form Content */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-beige/50">
              {editMode === 'form' ? (
                renderForm()
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-charcoal">JSON Editor - {activeTab}</h2>
                    <span className="text-sm text-charcoal/60 bg-beige/30 px-3 py-1 rounded-lg">
                      အဆင့်မြင့် Mode
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      JSON ဒေတာကို တည်းဖြတ်ပါ
                    </label>
                    <textarea
                      value={jsonData}
                      onChange={(e) => setJsonData(e.target.value)}
                      className="w-full h-96 px-4 py-3 border-2 border-beige rounded-xl focus:border-primary outline-none font-mono text-sm custom-scrollbar"
                      spellCheck={false}
                      placeholder="မှန်ကန်သော JSON ထည့်ပါ..."
                    />
                    <p className="text-xs text-charcoal/60 mt-2">
                      ⚠️ သင့် JSON မှန်ကန်ကြောင်း သေချာပါစေ။ မှားယွင်းသော JSON ကို သိမ်းဆည်းမည် မဟုတ်ပါ။
                    </p>
                  </div>

                  <button
                    onClick={handleJsonSave}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:from-primary-dark hover:to-primary transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    💾 JSON ပြောင်းလဲမှုများကို သိမ်းဆည်းမည်
                  </button>
                </div>
              )}
            </div>

            {/* Download & Export Section */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-purple-200">
              <div className="text-center space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-charcoal mb-2 flex items-center justify-center gap-2">
                    <span>📥</span> Export & Backup
                  </h3>
                  <p className="text-sm text-charcoal/60 mb-4">
                    သင့် Portfolio ဒေတာကို Backup အဖြစ် Download လုပ်ပါ
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Download Button */}
                  <button
                    onClick={handleDownloadJSON}
                    className="px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    JSON Download လုပ်မည်
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopyJSON}
                    className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Clipboard သို့ Copy လုပ်မည်
                  </button>
                </div>

                {/* Info */}
                <div className="mt-4 p-4 bg-white rounded-xl border border-purple-100 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1 text-sm">အသုံးပြုနည်း:</h4>
                      <ul className="text-xs text-charcoal/70 space-y-1">
                        <li>• <strong>Download:</strong> JSON ဖိုင်ကို သင့်ကွန်ပျူတာတွင် သိမ်းဆည်းပါ (Backup အတွက်)</li>
                        <li>• <strong>Copy:</strong> JSON ဒေတာကို Clipboard သို့ Copy လုပ်ပါ</li>
                        <li>• ဖိုင်ကို အခြား Device များတွင် အသုံးပြုနိုင်ပါသည်</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
              <div className="text-center">
                <h3 className="text-lg font-bold text-charcoal mb-2">⚠️ အန္တရာယ်ရှိသော နေရာ</h3>
                <p className="text-sm text-charcoal/60 mb-4">
                  အကြောင်းအရာအားလုံးကို မူလ Default တန်ဖိုးများသို့ ပြန်လည်သတ်မှတ်မည်
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 sm:px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  🔄 အားလုံးကို Default သို့ ပြန်လည်သတ်မှတ်မည်
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
