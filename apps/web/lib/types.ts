export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student' | 'parent' | 'staff';

export interface Institution {
  id: string;
  name: string;
  code: string;
  slogan: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  established_year: number;
}

export interface AppConfiguration {
  id: string;
  institution_id: string;
  app_name: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  welcome_banner_title: string;
  welcome_banner_subtitle: string;
  welcome_banner_image_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  about_text: string;
  android_version: string;
  ios_version: string;
  maintenance_mode: boolean;
  maintenance_message: string;
  is_active: boolean;
  updated_at?: string;
}

export interface AppModule {
  id: string;
  institution_id: string;
  module_key: string;
  name: string;
  description: string;
  icon: string;
  is_enabled: boolean;
  min_app_version: string;
  allowed_roles: UserRole[];
  display_order: number;
  settings?: Record<string, any>;
}

export interface AppNavigationItem {
  id: string;
  institution_id: string;
  role: UserRole;
  nav_type: 'bottom_nav' | 'quick_action' | 'drawer';
  label: string;
  icon: string;
  route: string;
  display_order: number;
  is_visible: boolean;
  badge_key?: string;
}

export interface Profile {
  id: string;
  institution_id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  gender?: 'male' | 'female' | 'other';
  date_of_birth?: string;
  blood_group?: string;
  address?: string;
  is_active: boolean;
}

export interface Student {
  id: string;
  profile_id: string;
  institution_id: string;
  student_id_code: string;
  class_id: string;
  section_id: string;
  roll_number: number;
  admission_date: string;
  status: 'active' | 'graduated' | 'transferred' | 'suspended' | 'withdrawn';
  qr_code_token?: string;
  profile?: Profile;
  class_name?: string;
  section_name?: string;
}

export interface Teacher {
  id: string;
  profile_id: string;
  institution_id: string;
  employee_id_code: string;
  department_id?: string;
  designation_id?: string;
  qualification?: string;
  specialization?: string;
  joining_date?: string;
  salary?: number;
  profile?: Profile;
  department_name?: string;
  designation_title?: string;
}

export interface Staff {
  id: string;
  profile_id: string;
  institution_id: string;
  employee_id_code: string;
  department_id?: string;
  designation_id?: string;
  joining_date?: string;
  salary?: number;
  profile?: Profile;
  department_name?: string;
  designation_title?: string;
}

export interface ClassItem {
  id: string;
  institution_id: string;
  name: string;
  numeric_level: number;
  category: 'primary' | 'school' | 'college';
}

export interface Section {
  id: string;
  institution_id: string;
  class_id: string;
  name: string;
  room_number?: string;
  capacity: number;
}

export interface Subject {
  id: string;
  institution_id: string;
  name: string;
  code: string;
  subject_type: 'theory' | 'practical' | 'both';
  is_optional: boolean;
}

export interface ClassRoutine {
  id: string;
  institution_id: string;
  class_id: string;
  section_id: string;
  subject_id: string;
  teacher_id?: string;
  day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  start_time: string;
  end_time: string;
  room_number?: string;
  subject_name?: string;
  teacher_name?: string;
}

export interface AttendanceRecord {
  id: string;
  institution_id: string;
  student_id: string;
  class_id: string;
  section_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  check_in_time?: string;
  remarks?: string;
  student_name?: string;
  student_code?: string;
}

export interface Examination {
  id: string;
  institution_id: string;
  academic_year_id: string;
  name: string;
  exam_type: string;
  start_date: string;
  end_date: string;
  is_published: boolean;
}

export interface ExamResult {
  id: string;
  examination_id: string;
  student_id: string;
  total_marks: number;
  gpa: number;
  grade: string;
  position_in_class?: number;
  remarks?: string;
  published_at?: string;
  student_name?: string;
  student_code?: string;
  class_name?: string;
  section_name?: string;
  subject_marks?: SubjectMark[];
}

export interface SubjectMark {
  id: string;
  examination_id: string;
  subject_id: string;
  student_id: string;
  marks_obtained: number;
  highest_marks: number;
  subject_name?: string;
}

export interface StudentFee {
  id: string;
  student_id: string;
  fee_category_id: string;
  title: string;
  amount: number;
  discount_amount: number;
  net_amount: number;
  due_date: string;
  status: 'unpaid' | 'partially_paid' | 'paid';
  category_name?: string;
  student_name?: string;
}

export interface Payment {
  id: string;
  institution_id: string;
  student_id: string;
  student_fee_id?: string;
  amount_paid: number;
  payment_method: string;
  receipt_number: string;
  payment_date: string;
  status: 'successful' | 'pending' | 'failed';
  student_name?: string;
}

export interface Announcement {
  id: string;
  institution_id: string;
  title: string;
  content: string;
  target_type: 'all' | 'role' | 'class';
  target_role?: string;
  target_class_id?: string;
  is_emergency: boolean;
  publish_date: string;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  institution_id: string;
  user_id: string;
  title: string;
  message: string;
  notification_type: 'attendance' | 'fee' | 'exam' | 'announcement' | 'general' | 'emergency';
  is_read: boolean;
  created_at: string;
}

export interface Book {
  id: string;
  institution_id: string;
  category_id?: string;
  title: string;
  author: string;
  isbn?: string;
  publisher?: string;
  available_copies: number;
  total_copies: number;
  cover_image_url?: string;
  category_name?: string;
}

export interface Vehicle {
  id: string;
  institution_id: string;
  vehicle_number: string;
  vehicle_type: string;
  capacity: number;
  driver_name?: string;
  driver_phone?: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface Visitor {
  id: string;
  institution_id: string;
  full_name: string;
  phone: string;
  purpose: string;
  person_to_meet: string;
  check_in_time: string;
  check_out_time?: string;
  pass_code_qr?: string;
  status: 'inside' | 'checked_out' | 'denied';
}

export interface EventItem {
  id: string;
  institution_id: string;
  title: string;
  description?: string;
  event_type: 'examination' | 'meeting' | 'event' | 'holiday' | 'sports';
  start_datetime: string;
  end_datetime: string;
  location?: string;
}

export interface DashboardStats {
  totalStudents: number;
  studentsGrowth: number;
  todayAttendancePercent: number;
  todayAttendanceGrowth: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  registeredBuses: number;
  feeCollectedMonth: number;
  feeGrowth: number;
  totalTeachers: number;
  totalStaff: number;
  totalClasses: number;
  systemStatus: string;
  uptime: string;
}
