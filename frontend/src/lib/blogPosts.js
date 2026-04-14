const blogPosts = [
  {
    slug: 'old-vs-new-tax-regime-which-one-saves-more',
    title: 'Old vs New Tax Regime: Which One Saves More?',
    excerpt: 'A practical comparison using real salary ranges and deduction scenarios.',
    category: 'Tax',
    publishedAt: '2026-03-10',
    updatedAt: '2026-03-10',
    description:
      'Compare old and new Indian tax regimes using practical salary bands, deductions, and simple break-even thinking.',
    content: [
      'The best tax regime depends on how much of your salary you can claim through deductions. The new regime gives lower slab rates but limits most deductions, while the old regime keeps common deduction options open.',
      'A simple way to decide is to calculate your yearly tax under both regimes with your real deduction profile, then compare post-tax in-hand amount. If your deductions are low, the new regime often wins. If your deductions are substantial, the old regime can still be better.',
      'Use a calculator first, then validate with your payroll assumptions like PF, standard deduction, and additional exemptions applicable to your case.',
    ],
  },
  {
    slug: 'estimate-in-hand-salary-from-ctc',
    title: 'How to Estimate In-Hand Salary From CTC',
    excerpt: 'Understand PF, income tax, cess, and employer components in simple terms.',
    category: 'Salary',
    publishedAt: '2026-03-21',
    updatedAt: '2026-03-21',
    description:
      'Learn how to move from headline CTC to realistic monthly in-hand salary by breaking down PF, tax, cess, and deductions.',
    content: [
      'CTC is not your take-home salary. It includes components like employer PF contributions, gratuity provisions, and sometimes variable pay that may not be paid monthly.',
      'To estimate in-hand correctly, separate annual fixed earnings from employer-side costs, then subtract employee PF, income tax, cess, and any recurring deductions. Convert the final annual number into a monthly figure for planning.',
      'The cleanest workflow is to model all components once and reuse the same structure whenever your compensation changes.',
    ],
  },
  {
    slug: 'salary-negotiation-math-what-actually-matters',
    title: 'Salary Negotiation Math: What Actually Matters',
    excerpt: 'Use effective monthly take-home numbers instead of headline CTC alone.',
    category: 'Career',
    publishedAt: '2026-04-02',
    updatedAt: '2026-04-02',
    description:
      'Negotiate compensation using effective in-hand and annual net gain instead of only comparing headline CTC percentages.',
    content: [
      'A 20 percent hike in CTC does not always mean a 20 percent increase in monthly take-home. Tax impact, variable components, and deduction changes can materially reduce the effective gain.',
      'During negotiation, compare offers using three numbers: expected monthly in-hand, annual guaranteed cash, and risk-adjusted variable compensation. This gives a realistic basis for decision-making.',
      'When two offers are close, optimize for predictability and growth runway, not just the biggest displayed package.',
    ],
  },
]

export function getAllBlogPosts() {
  return blogPosts
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) ?? null
}
