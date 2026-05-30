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
  field49: string;  // Sub-Referral Rights (toggle: Allowed / Not Allowed)
  field50: string;  // Assignment of Agreement (toggle: Allowed / Not Allowed)
  field51: string;  // Sub-Broking Appointment (toggle: Allowed / Not Allowed)
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
  field49: 'Sub-Referral Rights',
  field50: 'Assignment of Agreement',
  field51: 'Sub-Broking Appointment',
};

// Fields that render as Allowed / Not Allowed toggle
export const TOGGLE_FIELDS: (keyof FormFields)[] = ['field49', 'field50', 'field51'];

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
    label: 'I. Exclusivity & Permissions',
    fields: ['field43', 'field44', 'field45', 'field46', 'field49', 'field50', 'field51'] as (keyof FormFields)[],
  },
  {
    id: 'validity',
    label: 'J. Validity & Signatory',
    fields: ['field47', 'field48'] as (keyof FormFields)[],
  },
];

// Meaningful defaults so the PDF is never blank when user hasn't changed a field
const today = new Date().toISOString().split('T')[0];
const oneYearLater = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const DEFAULT_VALUES: FormFields = {
  field1: today,
  field2: 'Consultant Entity Name',
  field3: 'LLP IN / CIN Number',
  field4: 'Contact Person Name',
  field5: 'Address Line 1, City, State – PIN Code',
  field6: 'contact@example.com',
  field7: '+91 XXXXXXXXXX',
  field8: '+91 XXXXXXXXXX',
  field9: 'office@ipvultra.com',
  field10: '2%',
  field11: '5',
  field12: '20%',
  field13: '8%',
  field14: '1,00,00,000',
  field15: '25,00,000',
  field16: '25,00,000',
  field17: '25,00,000',
  field18: '25,00,000',
  field19: '1.5%',
  field20: '5',
  field21: '15%',
  field22: '8%',
  field23: '50,00,000',
  field24: '12,50,000',
  field25: '12,50,000',
  field26: '12,50,000',
  field27: '12,50,000',
  field28: '1',
  field29: '2',
  field30: '5',
  field31: '10',
  field32: '20',
  field33: '1%',
  field34: '1.25%',
  field35: '1.5%',
  field36: '1.75%',
  field37: '2%',
  field38: '1.5%',
  field39: '1.75%',
  field40: '2%',
  field41: '2.25%',
  field42: '2.5%',
  field43: 'Pan India',
  field44: oneYearLater,
  field45: '50,00,000',
  field46: '1,50,00,000',
  field47: '3',
  field48: 'Authorised Signatory Name',
  field49: 'Not Allowed',
  field50: 'Not Allowed',
  field51: 'Allowed',
};
