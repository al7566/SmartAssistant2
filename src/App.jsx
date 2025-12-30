import React, { useState } from 'react';
import { Calculator, MessageSquare, ClipboardList, HardHat, DollarSign, AlertTriangle, FileText, Menu, X } from 'lucide-react';

const ConstructionAssistant = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [calculatorType, setCalculatorType] = useState('concrete');
  const [projects, setProjects] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculator states
  const [concreteInputs, setConcreteInputs] = useState({ length: '', width: '', depth: '' });
  const [lumberInputs, setLumberInputs] = useState({ length: '', count: '' });
  const [drywallInputs, setDrywallInputs] = useState({ height: '', width: '' });
  const [flooringInputs, setFlooringInputs] = useState({ length: '', width: '' });

  // Project planner state
  const [projectForm, setProjectForm] = useState({
    name: '',
    budget: '',
    timeline: '',
    description: ''
  });

  const tabs = [
    { id: 'chat', name: 'Q&A Chat', icon: MessageSquare },
    { id: 'calculator', name: 'Calculators', icon: Calculator },
    { id: 'planner', name: 'Project Planner', icon: ClipboardList },
    { id: 'safety', name: 'Safety & Permits', icon: AlertTriangle },
    { id: 'estimator', name: 'Cost Estimator', icon: DollarSign }
  ];

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const newMessage = { type: 'user', text: userInput };
    setChatMessages([...chatMessages, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(userInput);
      setChatMessages(prev => [...prev, { type: 'assistant', text: response }]);
    }, 500);
    
    setUserInput('');
  };

  const getAIResponse = (question) => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('concrete') || lowerQ.includes('foundation')) {
      return "For concrete work, you'll typically need:\n\n1. Calculate volume: length × width × depth\n2. Add 10% for waste\n3. Standard mix ratio: 1:2:3 (cement:sand:gravel)\n4. Consider weather conditions for curing\n\nWould you like to use our concrete calculator for precise measurements?";
    }
    
    if (lowerQ.includes('permit') || lowerQ.includes('license')) {
      return "Building permits are typically required for:\n\n• Structural changes\n• Electrical work\n• Plumbing modifications\n• New construction\n• Additions over 120 sq ft\n\nCheck with your local building department for specific requirements. Processing usually takes 2-4 weeks.";
    }
    
    if (lowerQ.includes('cost') || lowerQ.includes('budget')) {
      return "Construction cost estimation factors:\n\n1. Materials (40-50% of budget)\n2. Labor (30-40%)\n3. Permits & fees (5-10%)\n4. Contingency (10-15%)\n\nUse our Cost Estimator tab for detailed breakdowns based on your project type.";
    }
    
    if (lowerQ.includes('safety') || lowerQ.includes('ppe')) {
      return "Essential construction safety equipment:\n\n• Hard hat (ANSI Z89.1)\n• Safety glasses\n• Steel-toed boots\n• Work gloves\n• High-visibility vest\n• Hearing protection (85+ dB environments)\n• Respirator (for dust/fumes)\n\nAlways conduct site safety inspections before work begins.";
    }
    
    return "I can help you with:\n\n• Material calculations\n• Project planning\n• Cost estimation\n• Safety guidelines\n• Permit information\n• Building codes\n• Best practices\n\nWhat specific aspect of your construction project would you like to know more about?";
  };

  const calculateConcrete = () => {
    const { length, width, depth } = concreteInputs;
    if (!length || !width || !depth) return null;
    
    const cubicYards = (parseFloat(length) * parseFloat(width) * parseFloat(depth)) / 27;
    const withWaste = cubicYards * 1.1;
    
    return {
      cubicYards: cubicYards.toFixed(2),
      withWaste: withWaste.toFixed(2),
      bags80lb: Math.ceil(withWaste * 45),
      bags60lb: Math.ceil(withWaste * 60),
      estimatedCost: `$${(withWaste * 125).toFixed(2)}`
    };
  };

  const calculateLumber = () => {
    const { length, count } = lumberInputs;
    if (!length || !count) return null;
    
    const boardFeet = (parseFloat(length) * parseFloat(count)) / 12;
    
    return {
      boardFeet: boardFeet.toFixed(2),
      linearFeet: (parseFloat(length) * parseFloat(count)).toFixed(2),
      estimatedCost: `$${(boardFeet * 4.5).toFixed(2)}`
    };
  };

  const calculateDrywall = () => {
    const { height, width } = drywallInputs;
    if (!height || !width) return null;
    
    const area = parseFloat(height) * parseFloat(width);
    const sheets = Math.ceil(area / 32); // 4x8 sheet = 32 sq ft
    
    return {
      area: area.toFixed(2),
      sheets: sheets,
      estimatedCost: `$${(sheets * 15).toFixed(2)}`
    };
  };

  const calculateFlooring = () => {
    const { length, width } = flooringInputs;
    if (!length || !width) return null;
    
    const area = parseFloat(length) * parseFloat(width);
    const withWaste = area * 1.1;
    
    return {
      area: area.toFixed(2),
      withWaste: withWaste.toFixed(2),
      boxes: Math.ceil(withWaste / 20), // Assume 20 sq ft per box
      estimatedCost: `$${(withWaste * 3.5).toFixed(2)}`
    };
  };

  const addProject = () => {
    if (!projectForm.name || !projectForm.budget) return;
    
    const newProject = {
      id: Date.now(),
      ...projectForm,
      status: 'Planning',
      createdAt: new Date().toLocaleDateString()
    };
    
    setProjects([...projects, newProject]);
    setProjectForm({ name: '', budget: '', timeline: '', description: '' });
  };

  const renderCalculator = () => {
    const calculators = {
      concrete: {
        title: 'Concrete Calculator',
        inputs: concreteInputs,
        setInputs: setConcreteInputs,
        fields: [
          { key: 'length', label: 'Length (ft)', type: 'number' },
          { key: 'width', label: 'Width (ft)', type: 'number' },
          { key: 'depth', label: 'Depth (in)', type: 'number' }
        ],
        calculate: calculateConcrete,
        results: calculateConcrete()
      },
      lumber: {
        title: 'Lumber Calculator',
        inputs: lumberInputs,
        setInputs: setLumberInputs,
        fields: [
          { key: 'length', label: 'Length per piece (ft)', type: 'number' },
          { key: 'count', label: 'Number of pieces', type: 'number' }
        ],
        calculate: calculateLumber,
        results: calculateLumber()
      },
      drywall: {
        title: 'Drywall Calculator',
        inputs: drywallInputs,
        setInputs: setDrywallInputs,
        fields: [
          { key: 'height', label: 'Wall Height (ft)', type: 'number' },
          { key: 'width', label: 'Total Width (ft)', type: 'number' }
        ],
        calculate: calculateDrywall,
        results: calculateDrywall()
      },
      flooring: {
        title: 'Flooring Calculator',
        inputs: flooringInputs,
        setInputs: setFlooringInputs,
        fields: [
          { key: 'length', label: 'Room Length (ft)', type: 'number' },
          { key: 'width', label: 'Room Width (ft)', type: 'number' }
        ],
        calculate: calculateFlooring,
        results: calculateFlooring()
      }
    };

    const calc = calculators[calculatorType];

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {Object.keys(calculators).map(type => (
            <button
              key={type}
              onClick={() => setCalculatorType(type)}
              className={`px-4 py-2 rounded capitalize ${
                calculatorType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">{calc.title}</h3>
          
          <div className="space-y-3">
            {calc.fields.map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={calc.inputs[field.key]}
                  onChange={(e) => calc.setInputs({ ...calc.inputs, [field.key]: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          {calc.results && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
              <h4 className="font-bold text-green-800 mb-2">Results:</h4>
              <div className="space-y-1 text-sm">
                {Object.entries(calc.results).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Ask me anything about construction!</p>
                  <p className="text-sm mt-2">Try questions about materials, costs, permits, or safety.</p>
                </div>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 shadow'
                      }`}
                    >
                      <pre className="whitespace-pre-wrap font-sans text-sm">{msg.text}</pre>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="border-t bg-white p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about construction, materials, costs..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        );

      case 'calculator':
        return renderCalculator();

      case 'planner':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Create New Project</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Budget ($)"
                  value={projectForm.budget}
                  onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Timeline (e.g., 2 weeks)"
                  value={projectForm.timeline}
                  onChange={(e) => setProjectForm({ ...projectForm, timeline: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Project Description"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
                />
                <button
                  onClick={addProject}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
                >
                  Add Project
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold">{project.name}</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Budget:</strong> ${project.budget}</p>
                    <p><strong>Timeline:</strong> {project.timeline}</p>
                    <p><strong>Created:</strong> {project.createdAt}</p>
                    {project.description && (
                      <p className="mt-2"><strong>Description:</strong> {project.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'safety':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-600" />
                Safety Guidelines
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg mb-2">Personal Protective Equipment (PPE)</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Hard hat (ANSI Z89.1 compliant)</li>
                    <li>Safety glasses with side shields</li>
                    <li>Steel-toed work boots</li>
                    <li>Work gloves appropriate for task</li>
                    <li>High-visibility vest for roadwork</li>
                    <li>Hearing protection ({'>'}85 dB environments)</li>
                    <li>Respirator for dust/chemical exposure</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">Site Safety Checklist</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Conduct daily safety briefings</li>
                    <li>Mark hazardous areas clearly</li>
                    <li>Ensure proper scaffolding inspection</li>
                    <li>Maintain clear emergency exits</li>
                    <li>Keep first aid kit accessible</li>
                    <li>Document all incidents</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="text-blue-600" />
                Permit Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Common Permits Required</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Building permit - structural changes</li>
                    <li>Electrical permit - wiring, panels</li>
                    <li>Plumbing permit - pipe work, fixtures</li>
                    <li>Mechanical permit - HVAC systems</li>
                    <li>Demolition permit - tear-downs</li>
                    <li>Grading permit - land alterations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Permit Process Timeline</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Application submission: 1-2 days</li>
                    <li>Review period: 2-4 weeks</li>
                    <li>Inspections: Scheduled throughout project</li>
                    <li>Final approval: 1-2 weeks after completion</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Always check with your local building department for specific requirements. 
                    Permit costs and timelines vary by location and project scope.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'estimator':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Cost Estimation Guide</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg mb-2">Average Cost Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span>Materials</span>
                      <span className="font-semibold">40-50% of budget</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span>Labor</span>
                      <span className="font-semibold">30-40% of budget</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span>Permits & Fees</span>
                      <span className="font-semibold">5-10% of budget</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span>Contingency</span>
                      <span className="font-semibold">10-15% of budget</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">Common Project Costs (per sq ft)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-blue-50 rounded">
                      <span>New Construction</span>
                      <span className="font-semibold">$150-$400/sq ft</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-50 rounded">
                      <span>Kitchen Remodel</span>
                      <span className="font-semibold">$100-$300/sq ft</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-50 rounded">
                      <span>Bathroom Remodel</span>
                      <span className="font-semibold">$120-$350/sq ft</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-50 rounded">
                      <span>Room Addition</span>
                      <span className="font-semibold">$80-$200/sq ft</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-50 rounded">
                      <span>Deck Construction</span>
                      <span className="font-semibold">$30-$60/sq ft</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <h4 className="font-bold mb-2">Cost-Saving Tips</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Buy materials in bulk for discounts</li>
                    <li>Schedule work during off-season</li>
                    <li>Get multiple contractor quotes</li>
                    <li>Consider DIY for simple tasks</li>
                    <li>Reuse or repurpose existing materials</li>
                    <li>Plan thoroughly to avoid change orders</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HardHat className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Construction Assistant</h1>
              <p className="text-sm text-gray-600">Your smart construction planning companion</p>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:block border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Navigation - Mobile */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t bg-white">
            <div className="px-4 py-2 space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-3 rounded font-medium ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className={activeTab === 'chat' ? 'h-[calc(100vh-200px)]' : ''}>
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p className="text-sm">
            Construction Assistant - Your smart construction planning companion
          </p>
          <p className="text-xs mt-2">
            This tool provides estimates and guidance. Always consult with licensed professionals for your projects.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ConstructionAssistant;
