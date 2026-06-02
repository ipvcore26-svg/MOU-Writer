export interface FormFields {
  // A. Execution
  field10: string;  // Execution Date

  // B. Consultant Details
  field11: string;  // Consultant Entity Name
  field12: string;  // LLP IN / CIN
  field1:  string;  // Contact Person Name
  field2:  string;  // Contact Person Address
  field3:  string;  // Contact Person Email
  field4:  string;  // Contact Person Phone
  field6:  string;  // Consultant Signatory Name

  // C. Investment Manager
  field5:  string;  // IPV Phone (Chaitanya, after +91)
  field13: string;  // IPV Office Email

  // D. IPV Ultra A
  field7:  string;  // Annual Mgmt Fee % (number only, template adds "% p.a.")
  field14: string;  // Charged for (Years)
  field15: string;  // Profit Sharing (Carry)
  field16: string;  // Hurdle Rate
  field17: string;  // Min Investment Ticket (INR)
  field18: string;  // 1st Drawdown (INR)
  field19: string;  // 2nd Drawdown (INR)
  field20: string;  // 3rd Drawdown (INR)
  field21: string;  // 4th Drawdown (INR)

  // E. IPV Ultra B
  field22: string;  // Annual Mgmt Fee (% p.a.)
  field23: string;  // Charged for (Years)
  field24: string;  // Profit Sharing (Carry)
  field25: string;  // Hurdle Rate
  field26: string;  // Min Investment Ticket (INR)
  field27: string;  // 1st Drawdown (INR)
  field28: string;  // 2nd Drawdown (INR)
  field29: string;  // 3rd Drawdown (INR)
  field30: string;  // 4th Drawdown (INR)

  // F. Contribution Slabs (INR Cr)
  field31: string;  // Slab 1 Amount
  field32: string;  // Slab 2 Amount
  field33: string;  // Slab 3 Amount
  field34: string;  // Slab 4 Amount
  field35: string;  // Slab 5 Amount

  // G. Fee Share ₹25L–50L
  field36: string;  // Slab 1 Fee %
  field37: string;  // Slab 2 Fee %
  field38: string;  // Slab 3 Fee %
  field39: string;  // Slab 4 Fee %
  field40: string;  // Slab 5 Fee %

  // H. Fee Share ₹50L+
  field41: string;  // Slab 1 Fee %
  field42: string;  // Slab 2 Fee %
  field43: string;  // Slab 3 Fee %
  field44: string;  // Slab 4 Fee %
  field45: string;  // Slab 5 Fee %

  // I. Exclusivity & Permissions
  field46: string;  // Exclusivity Region
  field47: string;  // Exclusivity End Date
  field8:  string;  // Min AUM Per Month (₹)
  field9:  string;  // Quarterly AUM Threshold (₹)
  field49: string;  // Sub-Referral Rights (toggle)
  field50: string;  // Assignment of Agreement (toggle)
  field51: string;  // Sub-Broking Appointment (toggle)

  // J. Validity & Signatory
  field48: string;  // Validity Period (Years)
}

export const FIELD_LABELS: Record<keyof FormFields, string> = {
  field10: 'Execution Date',
  field11: 'Consultant Entity Name',
  field12: 'LLP IN / CIN',
  field1:  'Contact Person Name',
  field2:  'Contact Person Address',
  field3:  'Contact Person Email',
  field4:  'Contact Person Phone',
  field6:  'Consultant Signatory Name',
  field5:  'Investment Manager Phone (after +91)',
  field13: 'IPV Office Email',
  field7:  'Annual Management Fee % (number only)',
  field14: 'Charged for (Years)',
  field15: 'Profit Sharing (Carry)',
  field16: 'Hurdle Rate',
  field17: 'Min Investment Ticket (INR)',
  field18: '1st Drawdown (INR)',
  field19: '2nd Drawdown (INR)',
  field20: '3rd Drawdown (INR)',
  field21: '4th Drawdown (INR)',
  field22: 'Annual Management Fee (% p.a.)',
  field23: 'Charged for (Years)',
  field24: 'Profit Sharing (Carry)',
  field25: 'Hurdle Rate',
  field26: 'Min Investment Ticket (INR)',
  field27: '1st Drawdown (INR)',
  field28: '2nd Drawdown (INR)',
  field29: '3rd Drawdown (INR)',
  field30: '4th Drawdown (INR)',
  field31: 'Slab 1 – Amount (INR Cr)',
  field32: 'Slab 2 – Amount (INR Cr)',
  field33: 'Slab 3 – Amount (INR Cr)',
  field34: 'Slab 4 – Amount (INR Cr)',
  field35: 'Slab 5 – Amount (INR Cr)',
  field36: 'Slab 1 – Fee % (₹25L–50L)',
  field37: 'Slab 2 – Fee % (₹25L–50L)',
  field38: 'Slab 3 – Fee % (₹25L–50L)',
  field39: 'Slab 4 – Fee % (₹25L–50L)',
  field40: 'Slab 5 – Fee % (₹25L–50L)',
  field41: 'Slab 1 – Fee % (₹50L+)',
  field42: 'Slab 2 – Fee % (₹50L+)',
  field43: 'Slab 3 – Fee % (₹50L+)',
  field44: 'Slab 4 – Fee % (₹50L+)',
  field45: 'Slab 5 – Fee % (₹50L+)',
  field46: 'Exclusivity Region',
  field47: 'Exclusivity End Date',
  field8:  'Min AUM Per Month (₹)',
  field9:  'Quarterly AUM Threshold (₹)',
  field49: 'Sub-Referral Rights',
  field50: 'Assignment of Agreement',
  field51: 'Sub-Broking Appointment',
  field48: 'Validity Period (Years)',
};

export const TOGGLE_FIELDS: (keyof FormFields)[] = ['field49', 'field50', 'field51'];

export const SECTIONS = [
  {
    id: 'execution',
    label: 'A. Execution Details',
    fields: ['field10'] as (keyof FormFields)[],
  },
  {
    id: 'consultant',
    label: 'B. Consultant Details',
    fields: ['field11', 'field12', 'field1', 'field2', 'field3', 'field4', 'field6'] as (keyof FormFields)[],
  },
  {
    id: 'investment-manager',
    label: 'C. Investment Manager',
    fields: ['field5', 'field13'] as (keyof FormFields)[],
  },
  {
    id: 'ultra-a',
    label: 'D. IPV Ultra A',
    fields: ['field7', 'field14', 'field15', 'field16', 'field17', 'field18', 'field19', 'field20', 'field21'] as (keyof FormFields)[],
  },
  {
    id: 'ultra-b',
    label: 'E. IPV Ultra B',
    fields: ['field22', 'field23', 'field24', 'field25', 'field26', 'field27', 'field28', 'field29', 'field30'] as (keyof FormFields)[],
  },
  {
    id: 'slabs',
    label: 'F. Contribution Slabs',
    fields: ['field31', 'field32', 'field33', 'field34', 'field35'] as (keyof FormFields)[],
  },
  {
    id: 'fee-25-50',
    label: 'G. Fee Share ₹25L–50L',
    fields: ['field36', 'field37', 'field38', 'field39', 'field40'] as (keyof FormFields)[],
  },
  {
    id: 'fee-50-plus',
    label: 'H. Fee Share ₹50L+',
    fields: ['field41', 'field42', 'field43', 'field44', 'field45'] as (keyof FormFields)[],
  },
  {
    id: 'exclusivity',
    label: 'I. Exclusivity & Permissions',
    fields: ['field46', 'field47', 'field8', 'field9', 'field49', 'field50', 'field51'] as (keyof FormFields)[],
  },
  {
    id: 'validity',
    label: 'J. Validity & Signatory',
    fields: ['field48'] as (keyof FormFields)[],
  },
];

// Sections A, B, C, J start blank — user must fill these
const oneYearLater = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const DEFAULT_VALUES: FormFields = {
  field10: '', field11: '', field12: '', field1: '', field2: '',
  field3: '', field4: '', field6: '', field5: '', field13: '',
  field7:  '2',
  field14: '5',
  field15: '20%',
  field16: '8% p.a.',
  field17: '1,00,00,000',
  field18: '25,00,000',
  field19: '25,00,000',
  field20: '25,00,000',
  field21: '25,00,000',
  field22: '1.5%',
  field23: '5',
  field24: '15% (with catchup)',
  field25: '8% p.a.',
  field26: '50,00,000',
  field27: '12,50,000',
  field28: '12,50,000',
  field29: '12,50,000',
  field30: '12,50,000',
  field31: '1',
  field32: '2',
  field33: '5',
  field34: '10',
  field35: '20',
  field36: '1%',
  field37: '1.25%',
  field38: '1.5%',
  field39: '1.75%',
  field40: '2%',
  field41: '1.5%',
  field42: '1.75%',
  field43: '2%',
  field44: '2.25%',
  field45: '2.5%',
  field46: 'Pan India',
  field47: oneYearLater,
  field8:  '50,00,000',
  field9:  '15000000',
  field49: 'Not Allowed',
  field50: 'Not Allowed',
  field51: 'Allowed',
  field48: '',
};

// Fallback values used only when generating the document (so no field is blank)
const today = new Date().toISOString().split('T')[0];

export const DOC_DEFAULTS: FormFields = {
  field10: today,
  field11: 'Consultant Entity Name',
  field12: 'LLP IN / CIN Number',
  field1:  'Contact Person Name',
  field2:  'Address Line 1, City, State – PIN Code',
  field3:  'contact@example.com',
  field4:  '+91 XXXXXXXXXX',
  field6:  'Authorised Signatory Name',
  field5:  'XXXXXXXXXX',
  field13: 'office@ipvultra.com',
  field7:  '2',
  field14: '5',
  field15: '20%',
  field16: '8% p.a.',
  field17: '1,00,00,000',
  field18: '25,00,000',
  field19: '25,00,000',
  field20: '25,00,000',
  field21: '25,00,000',
  field22: '1.5%',
  field23: '5',
  field24: '15% (with catchup)',
  field25: '8% p.a.',
  field26: '50,00,000',
  field27: '12,50,000',
  field28: '12,50,000',
  field29: '12,50,000',
  field30: '12,50,000',
  field31: '1',
  field32: '2',
  field33: '5',
  field34: '10',
  field35: '20',
  field36: '1%',
  field37: '1.25%',
  field38: '1.5%',
  field39: '1.75%',
  field40: '2%',
  field41: '1.5%',
  field42: '1.75%',
  field43: '2%',
  field44: '2.25%',
  field45: '2.5%',
  field46: 'Pan India',
  field47: oneYearLater,
  field8:  '50,00,000',
  field9:  '15000000',
  field49: 'Not Allowed',
  field50: 'Not Allowed',
  field51: 'Allowed',
  field48: '3',
};
