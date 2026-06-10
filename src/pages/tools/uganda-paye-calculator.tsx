import { useState } from 'react';
import { Copy } from 'lucide-react';

type Mode = 'formal' | 'casual';

const MODES: { value: Mode; label: string; desc: string; emoji: string }[] = [
  { value: 'formal', label: 'Formal Employment', desc: 'Uganda PAYE tax, NSSF deductions, net salary, and employer costs', emoji: '📊' },
  { value: 'casual', label: 'Casual Employment', desc: 'Uganda PAYE tax, NSSF deductions, net salary, and employer costs', emoji: '📈' },
];

export default function UgandaPayeCalculator() {
  const [mode, setMode] = useState<Mode>('formal');
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [employmentType, setEmploymentType] = useState<'formal' | 'casual'>('formal');
  const [hasDependents, setHasDependents] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const selectedMode = MODES.find((m) => m.value === mode)!;

  const calculatePaye = () => {
    const NSSF_EMPLOYEE_RATE = 0.05;
    const NSSF_EMPLOYER_RATE = 0.10;

    // URA monthly resident PAYE schedule (in effect June 2026)
    // 0 – 235,000:        0%
    // 235,001 – 335,000:  10% of amount over 235,000          → max 10,000
    // 335,001 – 410,000:  10,000 + 20% of amount over 335,000 → max 25,000
    // 410,001 – 10M:      25,000 + 30% of amount over 410,000
    // Above 10M:          as above + 10% surtax on amount over 10,000,000
    let payeTax = 0;
    if (grossSalary > 10000000) {
      // 2,902,000 = tax at the 10M ceiling = 25,000 + 30% × (10,000,000 − 410,000)
      payeTax = 2902000 + (grossSalary - 10000000) * 0.10;
    } else if (grossSalary > 410000) {
      payeTax = 25000 + (grossSalary - 410000) * 0.30;
    } else if (grossSalary > 335000) {
      payeTax = 10000 + (grossSalary - 335000) * 0.20;
    } else if (grossSalary > 235000) {
      payeTax = (grossSalary - 235000) * 0.10;
    }

    const nssfEmployeeDeduction = grossSalary * NSSF_EMPLOYEE_RATE;
    const nssfEmployerContribution = grossSalary * NSSF_EMPLOYER_RATE;
    const totalEmployeeDeductions = payeTax + nssfEmployeeDeduction;
    const netTakeHomePay = grossSalary - totalEmployeeDeductions;
    const totalEmployerCost = grossSalary + nssfEmployerContribution; // Total cost to employer including gross salary

    setResult({
      grossSalary,
      payeTax,
      nssfEmployeeDeduction,
      totalEmployeeDeductions,
      netTakeHomePay,
      nssfEmployerContribution,
      totalEmployerCost,
    });
  };

  const handleGrossSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (!isNaN(Number(value)) && Number(value) >= 0) {
      setGrossSalary(Number(value));
    } else if (value === '') {
      setGrossSalary(0);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString(
      'en-UG',
      { style: 'currency', currency: 'UGX', minimumFractionDigits: 0, maximumFractionDigits: 0 }
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4">
      <div className="mb-10">
        <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
          Uganda PAYE Income Tax Calculator
        </h1>
        <p className="text-white/50 max-w-xl">
          Calculate PAYE tax, NSSF deductions, net salary, and employer costs instantly for Uganda employees.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label htmlFor="grossSalary" className="text-xs text-white/40 mb-1 block">Gross Monthly Salary (UGX)</label>
          <input
            id="grossSalary"
            type="text"
            placeholder="1,500,000"
            value={grossSalary === 0 ? '' : grossSalary.toLocaleString('en-UG')}
            onChange={handleGrossSalaryChange}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-white/20 focus:outline-none focus:border-[#F5C518]/50 transition-colors"
            inputMode="numeric"
            pattern="[0-9,]*"
          />
          <p className="text-xs text-white/30 mt-1">Enter your gross monthly salary in Ugandan Shillings.</p>
        </div>

        <div>
          <label htmlFor="employmentType" className="text-xs text-white/40 mb-1 block">Employment Type</label>
          <select
            id="employmentType"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value as 'formal' | 'casual')}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#F5C518]/50 transition-colors appearance-none pr-8"
          >
            <option value="formal">Formal Employment</option>
            <option value="casual">Casual Employment</option>
          </select>
        </div>

        <div>
          <label htmlFor="hasDependents" className="text-xs text-white/40 mb-1 block">Has Dependents</label>
          <select
            id="hasDependents"
            value={hasDependents ? 'Yes' : 'No'}
            onChange={(e) => setHasDependents(e.target.value === 'Yes')}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#F5C518]/50 transition-colors appearance-none pr-8"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <button
          onClick={calculatePaye}
          disabled={grossSalary <= 0}
          className="w-full bg-[#F5C518] text-black py-4 rounded-xl font-black text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
        >
          Calculate PAYE
        </button>
      </div>

      {/* Results Display Card */}
      {result && (
        <div className="mt-12 bg-white/[0.03] border border-white/10 rounded-xl p-6 shadow-lg">
          <h3 className="font-display font-bold text-2xl text-[#F5C518] mb-4">Calculation Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-white/70">Gross Salary</span>
              <span className="font-semibold text-white">{formatNumber(result.grossSalary)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">PAYE Tax</span>
              <span className="font-semibold text-white">{formatNumber(result.payeTax)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">NSSF Employee Deduction</span>
              <span className="font-semibold text-white">{formatNumber(result.nssfEmployeeDeduction)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <span className="text-white/70 font-bold">Total Employee Deductions</span>
              <span className="font-bold text-white">{formatNumber(result.totalEmployeeDeductions)}</span>
            </div>
            <div className="flex justify-between items-center py-3 text-lg font-bold bg-[#F5C518]/10 rounded-md px-3 mt-4">
              <span className="text-[#F5C518]">Net Take Home Pay</span>
              <span className="text-[#F5C518]">{formatNumber(result.netTakeHomePay)}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
              <span className="text-white/70">Employer NSSF Contribution</span>
              <span className="font-semibold text-white">{formatNumber(result.nssfEmployerContribution)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <span className="text-white/70 font-bold">Total Employer Cost</span>
              <span className="font-bold text-white">{formatNumber(result.totalEmployerCost)}</span>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                const resultsText = `Uganda PAYE Calculation Results:\n\nGross Salary: ${formatNumber(result.grossSalary)}\nPAYE Tax: ${formatNumber(result.payeTax)}\nNSSF Employee Deduction: ${formatNumber(result.nssfEmployeeDeduction)}\nTotal Employee Deductions: ${formatNumber(result.totalEmployeeDeductions)}\nNet Take Home Pay: ${formatNumber(result.netTakeHomePay)}\nEmployer NSSF Contribution: ${formatNumber(result.nssfEmployerContribution)}\nTotal Employer Cost: ${formatNumber(result.totalEmployerCost)}`;
                navigator.clipboard.writeText(resultsText);
                alert('Results copied to clipboard!');
              }}
              className="bg-[#F5C518] text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <Copy size={16} /> Copy Results
            </button>
            <button
              onClick={() => setResult(null)}
              className="mt-3 text-white/50 text-sm hover:text-white transition-colors block mx-auto"
            >
              Clear Calculator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
