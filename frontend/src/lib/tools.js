const CURRENCY = 'currency'
const NUMBER = 'number'
const PERCENT = 'percent'

const toolList = [
  { slug: 'salary-calculator', name: 'Salary Calculator', category: 'Salary & Tax', mostUsed: true },
  { slug: 'ctc-to-in-hand-calculator', name: 'CTC to In-Hand Calculator', category: 'Salary & Tax', mostUsed: true },
  { slug: 'old-vs-new-tax-regime-calculator', name: 'Old vs New Tax Regime Calculator', category: 'Salary & Tax', mostUsed: true },
  { slug: 'income-tax-calculator-india', name: 'Income Tax Calculator (India)', category: 'Salary & Tax', mostUsed: true },
  { slug: 'monthly-salary-breakdown-tool', name: 'Monthly Salary Breakdown Tool', category: 'Salary & Tax', mostUsed: false },
  { slug: 'salary-hike-calculator', name: 'Salary Hike Calculator', category: 'Salary & Tax', mostUsed: true },
  { slug: 'bonus-variable-pay-calculator', name: 'Bonus & Variable Pay Calculator', category: 'Salary & Tax', mostUsed: false },
  { slug: 'pf-calculator', name: 'PF Calculator', category: 'Salary & Tax', mostUsed: true },
  { slug: 'home-loan-emi-calculator', name: 'Home Loan EMI Calculator', category: 'Real Estate', mostUsed: true },
  { slug: 'emi-affordability-calculator', name: 'EMI Affordability Calculator', category: 'Real Estate', mostUsed: true },
  { slug: 'rent-vs-buy-calculator', name: 'Rent vs Buy Calculator', category: 'Real Estate', mostUsed: true },
  { slug: 'rental-yield-calculator', name: 'Rental Yield Calculator', category: 'Real Estate', mostUsed: false },
  { slug: 'property-roi-calculator', name: 'Property ROI Calculator', category: 'Real Estate', mostUsed: false },
  { slug: 'pg-income-calculator', name: 'PG Income Calculator', category: 'Real Estate', mostUsed: false },
  { slug: 'construction-cost-calculator', name: 'Construction Cost Calculator', category: 'Real Estate', mostUsed: false },
  { slug: 'stamp-duty-calculator-india', name: 'Stamp Duty Calculator (India)', category: 'Real Estate', mostUsed: true },
  { slug: 'sip-calculator', name: 'SIP Calculator', category: 'Finance', mostUsed: true },
  { slug: 'lumpsum-investment-calculator', name: 'Lumpsum Investment Calculator', category: 'Finance', mostUsed: true },
  { slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', category: 'Finance', mostUsed: true },
  { slug: 'loan-eligibility-calculator', name: 'Loan Eligibility Calculator', category: 'Finance', mostUsed: false },
  { slug: 'personal-loan-emi-calculator', name: 'Personal Loan EMI Calculator', category: 'Finance', mostUsed: true },
  { slug: 'credit-card-interest-calculator', name: 'Credit Card Interest Calculator', category: 'Finance', mostUsed: true },
  { slug: 'gst-calculator-india', name: 'GST Calculator (India)', category: 'Business Tools', mostUsed: true },
  { slug: 'invoice-generator-pdf', name: 'Invoice Generator (PDF)', category: 'Business Tools', mostUsed: true },
  { slug: 'profit-margin-calculator', name: 'Profit Margin Calculator', category: 'Business Tools', mostUsed: true },
  { slug: 'break-even-calculator', name: 'Break-even Calculator', category: 'Business Tools', mostUsed: true },
  { slug: 'wealth-comparison-tool-india', name: 'Wealth Comparison Tool (India)', category: 'Viral Tools', mostUsed: true },
  { slug: 'time-to-become-crorepati-calculator', name: 'Time to Become Crorepati Calculator', category: 'Viral Tools', mostUsed: true },
  { slug: 'can-you-afford-this-house-tool', name: 'Can You Afford This House Tool', category: 'Viral Tools', mostUsed: true },
  { slug: 'salary-vs-lifestyle-calculator', name: 'Salary vs Lifestyle Calculator', category: 'Viral Tools', mostUsed: true },
]

const sharedFields = {
  ctc: { label: 'Annual CTC (INR)', type: NUMBER, defaultValue: 2000000 },
  taxRegime: {
    label: 'Tax Regime',
    type: 'select',
    defaultValue: 'new',
    options: [
      { label: 'New Regime', value: 'new' },
      { label: 'Old Regime', value: 'old' },
    ],
  },
  pfPercent: { label: 'PF Contribution (%)', type: NUMBER, defaultValue: 12 },
  deductions: { label: 'Other Deductions (INR)', type: NUMBER, defaultValue: 50000 },
}

export const toolConfigs = {
  'salary-calculator': { fields: ['ctc', 'taxRegime', 'pfPercent', 'deductions'] },
  'ctc-to-in-hand-calculator': { fields: ['ctc', 'taxRegime', 'pfPercent', 'deductions'] },
  'old-vs-new-tax-regime-calculator': { fields: [{ key: 'taxableIncome', label: 'Taxable Income', type: NUMBER, defaultValue: 1200000 }] },
  'income-tax-calculator-india': { fields: [{ key: 'taxableIncome', label: 'Taxable Income', type: NUMBER, defaultValue: 1200000 }, sharedFields.taxRegime] },
  'monthly-salary-breakdown-tool': { fields: ['ctc', 'taxRegime', 'pfPercent', 'deductions'] },
  'salary-hike-calculator': { fields: [{ key: 'currentSalary', label: 'Current Annual Salary', type: NUMBER, defaultValue: 1200000 }, { key: 'hikePercent', label: 'Hike Percentage', type: NUMBER, defaultValue: 20 }] },
  'bonus-variable-pay-calculator': { fields: [{ key: 'baseSalary', label: 'Base Annual Salary', type: NUMBER, defaultValue: 1000000 }, { key: 'bonusPercent', label: 'Bonus (%)', type: NUMBER, defaultValue: 10 }, { key: 'variablePercent', label: 'Variable Pay (%)', type: NUMBER, defaultValue: 15 }] },
  'pf-calculator': { fields: [{ key: 'basicSalary', label: 'Monthly Basic Salary', type: NUMBER, defaultValue: 50000 }, { key: 'pfPercent', label: 'PF Contribution (%)', type: NUMBER, defaultValue: 12 }] },
  'home-loan-emi-calculator': { fields: [{ key: 'principal', label: 'Loan Amount', type: NUMBER, defaultValue: 5000000 }, { key: 'annualRate', label: 'Annual Interest Rate (%)', type: NUMBER, defaultValue: 8.5 }, { key: 'years', label: 'Loan Tenure (Years)', type: NUMBER, defaultValue: 20 }] },
  'emi-affordability-calculator': { fields: [{ key: 'monthlyBudget', label: 'Affordable EMI (Monthly)', type: NUMBER, defaultValue: 40000 }, { key: 'annualRate', label: 'Annual Interest Rate (%)', type: NUMBER, defaultValue: 8.5 }, { key: 'years', label: 'Loan Tenure (Years)', type: NUMBER, defaultValue: 20 }] },
  'rent-vs-buy-calculator': { fields: [{ key: 'monthlyRent', label: 'Monthly Rent', type: NUMBER, defaultValue: 35000 }, { key: 'homePrice', label: 'Home Price', type: NUMBER, defaultValue: 8000000 }, { key: 'years', label: 'Analysis Years', type: NUMBER, defaultValue: 10 }] },
  'rental-yield-calculator': { fields: [{ key: 'propertyValue', label: 'Property Value', type: NUMBER, defaultValue: 10000000 }, { key: 'monthlyRent', label: 'Monthly Rent', type: NUMBER, defaultValue: 40000 }] },
  'property-roi-calculator': { fields: [{ key: 'purchasePrice', label: 'Purchase Price', type: NUMBER, defaultValue: 7000000 }, { key: 'sellingPrice', label: 'Selling Price', type: NUMBER, defaultValue: 9200000 }, { key: 'expenses', label: 'Total Expenses', type: NUMBER, defaultValue: 500000 }] },
  'pg-income-calculator': { fields: [{ key: 'beds', label: 'Number of Beds', type: NUMBER, defaultValue: 20 }, { key: 'rentPerBed', label: 'Rent per Bed', type: NUMBER, defaultValue: 9000 }, { key: 'occupancyPercent', label: 'Occupancy (%)', type: NUMBER, defaultValue: 90 }, { key: 'monthlyExpenses', label: 'Monthly Expenses', type: NUMBER, defaultValue: 50000 }] },
  'construction-cost-calculator': { fields: [{ key: 'areaSqft', label: 'Area (Sq Ft)', type: NUMBER, defaultValue: 2000 }, { key: 'costPerSqft', label: 'Cost per Sq Ft', type: NUMBER, defaultValue: 2200 }] },
  'stamp-duty-calculator-india': { fields: [{ key: 'propertyValue', label: 'Property Value', type: NUMBER, defaultValue: 8500000 }, { key: 'stampRate', label: 'Stamp Duty (%)', type: NUMBER, defaultValue: 6 }, { key: 'registrationRate', label: 'Registration Rate (%)', type: NUMBER, defaultValue: 1 }] },
  'sip-calculator': { fields: [{ key: 'monthlyInvestment', label: 'Monthly Investment', type: NUMBER, defaultValue: 25000 }, { key: 'annualReturn', label: 'Expected Annual Return (%)', type: NUMBER, defaultValue: 12 }, { key: 'years', label: 'Investment Years', type: NUMBER, defaultValue: 15 }] },
  'lumpsum-investment-calculator': { fields: [{ key: 'principal', label: 'Investment Amount', type: NUMBER, defaultValue: 500000 }, { key: 'annualReturn', label: 'Expected Annual Return (%)', type: NUMBER, defaultValue: 11 }, { key: 'years', label: 'Investment Years', type: NUMBER, defaultValue: 10 }] },
  'compound-interest-calculator': { fields: [{ key: 'principal', label: 'Principal', type: NUMBER, defaultValue: 200000 }, { key: 'annualReturn', label: 'Annual Rate (%)', type: NUMBER, defaultValue: 9 }, { key: 'years', label: 'Years', type: NUMBER, defaultValue: 8 }] },
  'loan-eligibility-calculator': { fields: [{ key: 'netMonthlyIncome', label: 'Net Monthly Income', type: NUMBER, defaultValue: 120000 }, { key: 'monthlyObligations', label: 'Monthly Obligations', type: NUMBER, defaultValue: 20000 }, { key: 'foirPercent', label: 'FOIR (%)', type: NUMBER, defaultValue: 50 }, { key: 'annualRate', label: 'Interest Rate (%)', type: NUMBER, defaultValue: 9 }, { key: 'years', label: 'Tenure (Years)', type: NUMBER, defaultValue: 20 }] },
  'personal-loan-emi-calculator': { fields: [{ key: 'principal', label: 'Loan Amount', type: NUMBER, defaultValue: 1000000 }, { key: 'annualRate', label: 'Annual Interest Rate (%)', type: NUMBER, defaultValue: 13 }, { key: 'years', label: 'Tenure (Years)', type: NUMBER, defaultValue: 5 }] },
  'credit-card-interest-calculator': { fields: [{ key: 'outstandingBalance', label: 'Outstanding Balance', type: NUMBER, defaultValue: 150000 }, { key: 'annualRate', label: 'Annual Interest Rate (%)', type: NUMBER, defaultValue: 36 }, { key: 'months', label: 'Months', type: NUMBER, defaultValue: 6 }] },
  'gst-calculator-india': {
    fields: [{ key: 'amount', label: 'Amount', type: NUMBER, defaultValue: 10000 }, { key: 'gstRate', label: 'GST Rate (%)', type: NUMBER, defaultValue: 18 }, { key: 'mode', label: 'Calculation Mode', type: 'select', defaultValue: 'exclusive', options: [{ label: 'Add GST (Exclusive)', value: 'exclusive' }, { label: 'Extract GST (Inclusive)', value: 'inclusive' }] }],
  },
  'invoice-generator-pdf': { fields: [{ key: 'quantity', label: 'Quantity', type: NUMBER, defaultValue: 5 }, { key: 'unitPrice', label: 'Unit Price', type: NUMBER, defaultValue: 2500 }, { key: 'gstRate', label: 'GST Rate (%)', type: NUMBER, defaultValue: 18 }] },
  'profit-margin-calculator': { fields: [{ key: 'revenue', label: 'Revenue', type: NUMBER, defaultValue: 800000 }, { key: 'cost', label: 'Cost', type: NUMBER, defaultValue: 520000 }] },
  'break-even-calculator': { fields: [{ key: 'fixedCosts', label: 'Fixed Costs', type: NUMBER, defaultValue: 300000 }, { key: 'sellingPricePerUnit', label: 'Selling Price / Unit', type: NUMBER, defaultValue: 1400 }, { key: 'variableCostPerUnit', label: 'Variable Cost / Unit', type: NUMBER, defaultValue: 850 }] },
  'wealth-comparison-tool-india': { fields: [{ key: 'netWorth', label: 'Your Net Worth', type: NUMBER, defaultValue: 6500000 }, { key: 'benchmark', label: 'Benchmark Net Worth', type: NUMBER, defaultValue: 5000000 }] },
  'time-to-become-crorepati-calculator': { fields: [{ key: 'currentSavings', label: 'Current Savings', type: NUMBER, defaultValue: 1000000 }, { key: 'monthlyInvestment', label: 'Monthly Investment', type: NUMBER, defaultValue: 50000 }, { key: 'annualReturn', label: 'Expected Annual Return (%)', type: NUMBER, defaultValue: 12 }] },
  'can-you-afford-this-house-tool': { fields: [{ key: 'monthlyIncome', label: 'Monthly Income', type: NUMBER, defaultValue: 150000 }, { key: 'housePrice', label: 'House Price', type: NUMBER, defaultValue: 8500000 }] },
  'salary-vs-lifestyle-calculator': { fields: [{ key: 'monthlySalary', label: 'Monthly Salary', type: NUMBER, defaultValue: 120000 }, { key: 'monthlyExpenses', label: 'Monthly Lifestyle Expenses', type: NUMBER, defaultValue: 70000 }] },
}

export function getToolMeta(slug) {
  const found = toolList.find((item) => item.slug === slug)
  if (!found) return null
  return {
    slug: found.slug,
    name: found.name,
    category: found.category,
    description: `${found.name} for India with instant result and mobile-first UX.`,
  }
}

export function getFieldsForTool(slug) {
  const config = toolConfigs[slug]
  if (!config) return []
  return config.fields.map((field) => {
    if (typeof field === 'string') {
      return { key: field, ...sharedFields[field] }
    }
    return field
  })
}

export function getAllTools() {
  return toolList.map((tool) => ({ ...tool }))
}

export function getMostUsedTools() {
  return toolList.filter((tool) => tool.mostUsed)
}

export function getToolsByCategory() {
  return toolList.reduce((accumulator, tool) => {
    if (!accumulator[tool.category]) {
      accumulator[tool.category] = []
    }
    accumulator[tool.category].push(tool)
    return accumulator
  }, {})
}

export function formatResult(key, value) {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'string') return value
  if (key.toLowerCase().includes('percent') || key.toLowerCase().includes('rate')) return `${Number(value || 0).toFixed(2)}%`
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(value || 0))
}

export { CURRENCY, NUMBER, PERCENT }
