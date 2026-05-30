export interface FormFields {
  field1: string;   // Execution Date
  field2: string;   // Consultant Entity Name
  field3: string;   // LLP IN / CIN
  field4: string;   // Contact Person Name
  field5: string;   // Contact Person Address
  field6: string;   // Contact Person Email
  field7: string;   // Contact Person Phone
  field8: string;   // IPV Phone (Chaitanya)
  field9: string;   // IPV Office Email
  field10: string;  // Ultra A Mgmt Fee %
  field11: string;  // Ultra A Years
  field12: string;  // Ultra A Carry
  field13: string;  // Ultra A Hurdle
  field14: string;  // Ultra A Min Ticket
  field15: string;  // Ultra A 1st Drawdown
  field16: string;  // Ultra A 2nd Drawdown
  field17: string;  // Ultra A 3rd Drawdown
  field18: string;  // Ultra A 4th Drawdown
  field19: string;  // Ultra B Mgmt Fee
  field20: string;  // Ultra B Years
  field21: string;  // Ultra B Carry
  field22: string;  // Ultra B Hurdle
  field23: string;  // Ultra B Min Ticket
  field24: string;  // Ultra B 1st Drawdown
  field25: string;  // Ultra B 2nd Drawdown
  field26: string;  // Ultra B 3rd Drawdown
  field27: string;  // Ultra B 4th Drawdown
  field28: string;  // Slab 1 Amount
  field29: string;  // Slab 2 Amount
  field30: string;  // Slab 3 Amount
  field31: string;  // Slab 4 Amount
  field32: string;  // Slab 5 Amount
  field33: string;  // Slab 1 Fee % ₹25L–50L
  field34: string;  // Slab 2 Fee % ₹25L–50L
  field35: string;  // Slab 3 Fee % ₹25L–50L
  field36: string;  // Slab 4 Fee % ₹25L–50L
  field37: string;  // Slab 5 Fee % ₹25L–50L
  field38: string;  // Slab 1 Fee % ₹50L+
  field39: string;  // Slab 2 Fee % ₹50L+
  field40: string;  // Slab 3 Fee % ₹50L+
  field41: string;  // Slab 4 Fee % ₹50L+
  field42: string;  // Slab 5 Fee % ₹50L+
  field43: string;  // Exclusivity Region
  field44: string;  // Exclusivity End Date
  field45: string;  // Min AUM Per Month
  field46: string;  // Quarterly AUM Threshold
  field47: string;  // Validity Period Years
  field48: string;  // Consultant Signatory Name
}

export const FIELD_LABELS: Record<keyof FormFields, string> = {
  field1: 'Execution Date',
  field2: 'Consultant Entity Name',
  field3: 'LLP IN / CIN',
  field4: 'Contact Person Name',
  field5: 'Contact Person Address',
  field6: 'Contact Person Email',
  field7: 'Contact Person Phone',
  field8: 'IPV Phone (Chaitanya)',
  field9: 'IPV Office Email',
  field10: 'Annual Management Fee %',
  field11: 'Charged for (Years)',
  field12: 'Profit Sharing (Carry)',
  field13: 'Hurdle Rate',
  field14: 'Min Investment Ticket (INR)',
  field15: '1st Drawdown (INR)',
  field16: '2nd Drawdown (INR)',
  field17: '3rd Drawdown (INR)',
  field18: '4th Drawdown (INR)',
  field19: 'Annual Management Fee',
  field20: 'Charged for (Years)',
  field21: 'Profit Sharing (Carry)',
  field22: 'Hurdle Rate',
  field23: 'Min Investment Ticket (INR)',
  field24: '1st Drawdown (INR)',
  field25: '2nd Drawdown (INR)',
  field26: '3rd Drawdown (INR)',
  field27: '4th Drawdown (INR)',
  field28: 'Slab 1 – Contribution Amount (INR Cr)',
  field29: 'Slab 2 – Contribution Amount (INR Cr)',
  field30: 'Slab 3 – Contribution Amount (INR Cr)',
  field31: 'Slab 4 – Contribution Amount (INR Cr)',
  field32: 'Slab 5 – Contribution Amount (INR Cr)',
  field33: 'Slab 1 – Fee % (₹25L–50L)',
  field34: 'Slab 2 – Fee % (₹25L–50L)',
  field35: 'Slab 3 – Fee % (₹25L–50L)',
  field36: 'Slab 4 – Fee % (₹25L–50L)',
  field37: 'Slab 5 – Fee % (₹25L–50L)',
  field38: 'Slab 1 – Fee % (₹50L+)',
  field39: 'Slab 2 – Fee % (₹50L+)',
  field40: 'Slab 3 – Fee % (₹50L+)',
  field41: 'Slab 4 – Fee % (₹50L+)',
  field42: 'Slab 5 – Fee % (₹50L+)',
  field43: 'Exclusivity Region',
  field44: 'Exclusivity End Date',
  field45: 'Min AUM Per Month (₹)',
  field46: 'Quarterly AUM Threshold (₹)',
  field47: 'Validity Period (Years)',
  field48: 'Consultant Signatory Name',
};

export const SECTIONS = [
  {
    id: 'execution',
    label: 'A. Execution Details',
    fields: ['field1'] as (keyof FormFields)[],
  },
  {
    id: 'consultant',
    label: 'B. Consultant Details',
    fields: ['field2', 'field3', 'field4', 'field5', 'field6', 'field7'] as (keyof FormFields)[],
  },
  {
    id: 'investment-manager',
    label: 'C. Investment Manager',
    fields: ['field8', 'field9'] as (keyof FormFields)[],
  },
  {
    id: 'ultra-a',
    label: 'D. IPV Ultra A',
    fields: ['field10', 'field11', 'field12', 'field13', 'field14', 'field15', 'field16', 'field17', 'field18'] as (keyof FormFields)[],
  },
  {
    id: 'ultra-b',
    label: 'E. IPV Ultra B',
    fields: ['field19', 'field20', 'field21', 'field22', 'field23', 'field24', 'field25', 'field26', 'field27'] as (keyof FormFields)[],
  },
  {
    id: 'slabs',
    label: 'F. Contribution Slabs',
    fields: ['field28', 'field29', 'field30', 'field31', 'field32'] as (keyof FormFields)[],
  },
  {
    id: 'fee-25-50',
    label: 'G. Fee Share ₹25L–50L',
    fields: ['field33', 'field34', 'field35', 'field36', 'field37'] as (keyof FormFields)[],
  },
  {
    id: 'fee-50-plus',
    label: 'H. Fee Share ₹50L+',
    fields: ['field38', 'field39', 'field40', 'field41', 'field42'] as (keyof FormFields)[],
  },
  {
    id: 'exclusivity',
    label: 'I. Exclusivity',
    fields: ['field43', 'field44', 'field45', 'field46'] as (keyof FormFields)[],
  },
  {
    id: 'validity',
    label: 'J. Validity & Signatory',
    fields: ['field47', 'field48'] as (keyof FormFields)[],
  },
];

export const DEFAULT_VALUES: FormFields = {
  field1: '', field2: '', field3: '', field4: '', field5: '', field6: '', field7: '',
  field8: '', field9: '', field10: '', field11: '', field12: '', field13: '', field14: '',
  field15: '', field16: '', field17: '', field18: '', field19: '', field20: '', field21: '',
  field22: '', field23: '', field24: '', field25: '', field26: '', field27: '', field28: '',
  field29: '', field30: '', field31: '', field32: '', field33: '', field34: '', field35: '',
  field36: '', field37: '', field38: '', field39: '', field40: '', field41: '', field42: '',
  field43: '', field44: '', field45: '', field46: '', field47: '', field48: '',
};
