const defaultContent = {
  formula: 'Results are computed using standard financial formulas with India-focused defaults where applicable.',
  assumptions: [
    'Inputs are annual unless the field label says monthly.',
    'Rates are nominal percentages and not inflation-adjusted.',
    'Outputs are estimates for planning, not legal or tax advice.',
  ],
  faqs: [
    { q: 'How accurate are these calculator results?', a: 'The calculators use deterministic formulas and the values you enter, so accuracy depends on your inputs and assumptions.' },
    { q: 'Can I use this for final financial decisions?', a: 'Use these outputs for planning, then validate with your accountant, lender, or advisor before final decisions.' },
  ],
}

const byTool = {
  'salary-calculator': {
    formula: 'In-hand = CTC - employee PF - income tax - cess - other deductions.',
    assumptions: ['Tax is computed using selected regime slabs.', 'Cess is applied at 4% on income tax.', 'PF uses the selected PF percent on annual CTC.'],
  },
  'home-loan-emi-calculator': {
    formula: 'EMI = P × r × (1+r)^n / ((1+r)^n - 1).',
    assumptions: ['Interest is monthly reducing balance.', 'Rate is annual and converted to monthly.', 'Processing and insurance charges are excluded.'],
  },
  'sip-calculator': {
    formula: 'Future Value of SIP = M × [((1+r)^n - 1) × (1+r) / r].',
    assumptions: ['Investments happen monthly.', 'Return is constant over the full tenure.', 'No exit load, tax, or fund expense drag included.'],
  },
  'gst-calculator-india': {
    formula: 'Exclusive: Total = Base + GST; Inclusive: Base = Total / (1 + GST%).',
    assumptions: ['Single GST rate applied on full amount.', 'No item-wise mixed slab handling.', 'Round-off may slightly differ by invoicing systems.'],
  },
}

export function getToolContent(slug) {
  return {
    ...defaultContent,
    ...(byTool[slug] ?? {}),
    faqs: (byTool[slug]?.faqs ?? defaultContent.faqs),
  }
}
