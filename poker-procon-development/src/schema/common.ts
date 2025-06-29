export type CustomeError = {
  code: string;
  field?: string;
  message: string;
  timestamp: string;
};

export type ErrorCode =
  | 'BA001'
  | 'BB001'
  | 'BB002'
  | 'BB003'
  | 'BB004'
  | 'BB005'
  | 'BB006'
  | 'BB007'
  | 'BB008'
  | 'BB009'
  | 'BC001'
  | 'BC002'
  | 'BC003'
  | 'BC004'
  | 'BD001'
  | 'BZ001';
