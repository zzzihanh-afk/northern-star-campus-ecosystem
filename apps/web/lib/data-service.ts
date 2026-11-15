import { supabase, isSupabaseConfigured } from './supabase';
import {
  DashboardStats,
  AppConfiguration,
  AppModule,
  AppNavigationItem,
  Student,
  Teacher,
  Staff,
  ClassItem,
  Section,
  AttendanceRecord,
  ExamResult,
  StudentFee,
  Payment,
  Announcement,
  NotificationItem,
  Book,
  Vehicle,
  Visitor,
  EventItem,
} from './types';

// Default Northern Star Smart Campus initial state matching official design showcase
const INITIAL_APP_CONFIG: AppConfiguration = {
  id: 'c0000000-0000-0000-0000-000000000001',
  institution_id: 'a0000000-0000-0000-0000-000000000001',
  app_name: 'Northern Star Smart Campus',
  logo_url: '/logo.png',
  primary_color: '#0B1E38',
  secondary_color: '#2563EB',
  accent_color: '#F59E0B',
  welcome_banner_title: 'Welcome to Northern Star School & College',
  welcome_banner_subtitle: 'Building a Smart Campus for a Brighter Future',
  welcome_banner_image_url: '/dashboard-ref.png',
  contact_email: 'info@northernstar.edu.bd',
  contact_phone: '+880 1800-000000',
  contact_address: 'Campus Avenue, Sector 7, Uttara, Dhaka-1230',
  about_text: 'Northern Star School & College is dedicated to cultivating leaders through holistic education, academic excellence, and modern digital campus infrastructure.',
  android_version: '1.2.0',
  ios_version: '1.2.0',
  maintenance_mode: false,
  maintenance_message: 'Northern Star Smart Campus is currently undergoing scheduled maintenance. Please check back shortly.',
  is_active: true,
};

const INITIAL_MODULES: AppModule[] = [
  { id: 'm1', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'attendance', name: 'Attendance Tracker', description: 'Daily class, student, and teacher attendance', icon: 'CalendarCheck', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'teacher', 'staff', 'admin', 'super_admin'], display_order: 1 },
  { id: 'm2', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'homework', name: 'Homework & Assignments', description: 'Subject homework uploading and digital submissions', icon: 'BookOpen', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'teacher', 'admin', 'super_admin'], display_order: 2 },
  { id: 'm3', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'results', name: 'Examinations & Results', description: 'Published term exam results, GPA, and report cards', icon: 'Award', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'teacher', 'admin', 'super_admin'], display_order: 3 },
  { id: 'm4', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'fees', name: 'Fee & Financial Management', description: 'Monthly tuition fees, receipts and online payment gateways', icon: 'CreditCard', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'admin', 'super_admin'], display_order: 4 },
  { id: 'm5', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'library', name: 'Digital Library Catalogue', description: 'Book search, borrow requests, and book return tracking', icon: 'Book', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'teacher', 'staff', 'admin', 'super_admin'], display_order: 5 },
  { id: 'm6', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'transport', name: 'Transport & Bus Tracking', description: 'Fleet schedules, route stops and bus allocations', icon: 'Bus', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'staff', 'admin', 'super_admin'], display_order: 6 },
  { id: 'm7', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'digital_id', name: 'Digital Student & Staff ID', description: 'Official high-contrast QR identification pass', icon: 'QrCode', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'staff', 'admin', 'super_admin'], display_order: 7 },
  { id: 'm8', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'routine', name: 'Academic Routine & Timetable', description: 'Period schedules, rooms, and teacher allocations', icon: 'Clock', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'teacher', 'admin', 'super_admin'], display_order: 8 },
  { id: 'm9', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'communication', name: 'Notice Board & Messaging', description: 'Institution circulars, push notifications, and chat', icon: 'Bell', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'teacher', 'staff', 'admin', 'super_admin'], display_order: 9 },
  { id: 'm10', institution_id: 'a0000000-0000-0000-0000-000000000001', module_key: 'events', name: 'Events & Academic Calendar', description: 'Exams, sports day, meetings, and holiday calendar', icon: 'Calendar', is_enabled: true, min_app_version: '1.0.0', allowed_roles: ['student', 'parent', 'teacher', 'staff', 'admin', 'super_admin'], display_order: 10 },
];

let appConfigState = { ...INITIAL_APP_CONFIG };
let appModulesState = [...INITIAL_MODULES];

export const dataService = {
  // 1. DASHBOARD OVERVIEW & STATS
  async getDashboardStats(): Promise<DashboardStats> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { count: studentCount } = await supabase.from('students').select('*', { count: 'exact', head: true });
        const { count: teacherCount } = await supabase.from('teachers').select('*', { count: 'exact', head: true });
        const { count: staffCount } = await supabase.from('staff').select('*', { count: 'exact', head: true });
        const { count: busCount } = await supabase.from('vehicles').select('*', { count: 'exact', head: true });

        return {
          totalStudents: studentCount || 1250,
          studentsGrowth: 5,
          todayAttendancePercent: 98,
          todayAttendanceGrowth: 2,
          presentCount: 1200,
          absentCount: 50,
          lateCount: 20,
          registeredBuses: busCount || 12,
          feeCollectedMonth: 375500,
          feeGrowth: 12,
          totalTeachers: teacherCount || 68,
          totalStaff: staffCount || 24,
          totalClasses: 12,
          systemStatus: 'All Systems Online',
          uptime: '99.9%',
        };
      } catch (err) {
        console.warn('Falling back to local data stats', err);
      }
    }

    // Default figures directly matching the Web UI reference image
    return {
      totalStudents: 1250,
      studentsGrowth: 5,
      todayAttendancePercent: 98,
      todayAttendanceGrowth: 2,
      presentCount: 1200,
      absentCount: 50,
      lateCount: 20,
      registeredBuses: 12,
      feeCollectedMonth: 375500,
      feeGrowth: 12,
      totalTeachers: 68,
      totalStaff: 24,
      totalClasses: 12,
      systemStatus: 'All Systems Online',
      uptime: '99.9%',
    };
  },

  // 2. CENTRAL MOBILE APP MANAGEMENT (Section 4.2)
  async getAppConfiguration(): Promise<AppConfiguration> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('app_configurations').select('*').limit(1).single();
        if (data && !error) return data as AppConfiguration;
      } catch (e) {
        console.warn(e);
      }
    }
    return appConfigState;
  },

  async updateAppConfiguration(updated: Partial<AppConfiguration>): Promise<AppConfiguration> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('app_configurations')
          .update(updated)
          .eq('id', appConfigState.id)
          .select()
          .single();
        if (data && !error) {
          appConfigState = data as AppConfiguration;
          return appConfigState;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    appConfigState = { ...appConfigState, ...updated, updated_at: new Date().toISOString() };
    return appConfigState;
  },

  async getAppModules(): Promise<AppModule[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('app_modules').select('*').order('display_order', { ascending: true });
        if (data && !error && data.length > 0) return data as AppModule[];
      } catch (e) {
        console.warn(e);
      }
    }
    return appModulesState;
  },

  async toggleAppModule(moduleKey: string, isEnabled: boolean): Promise<AppModule[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('app_modules').update({ is_enabled: isEnabled }).eq('module_key', moduleKey);
      } catch (e) {
        console.warn(e);
      }
    }
    appModulesState = appModulesState.map((m) =>
      m.module_key === moduleKey ? { ...m, is_enabled: isEnabled } : m
    );
    return appModulesState;
  },

  // 3. STUDENTS MANAGEMENT (Section 4.3)
  async getStudents(): Promise<Student[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*, profile:profiles(*), class:classes(name), section:sections(name)')
          .order('student_id_code', { ascending: true });
        if (data && !error && data.length > 0) {
          return data.map((item: any) => ({
            ...item,
            class_name: item.class?.name || 'Class 9',
            section_name: item.section?.name || 'A',
          }));
        }
      } catch (e) {
        console.warn(e);
      }
    }

    // Default student matching reference image: Rahim Ahmed (Class: 9-A, ID: NSC2025001)
    return [
      {
        id: 'st000000-0000-0000-0000-000000000001',
        profile_id: 'b0000000-0000-0000-0000-000000000003',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id_code: 'NSC2025001',
        class_id: 'e0000000-0000-0000-0000-000000000009',
        section_id: 'f0000000-0000-0000-0000-000000000001',
        roll_number: 1,
        admission_date: '2024-01-10',
        status: 'active',
        qr_code_token: 'NSSC_QR_TOKEN_SECURE_RAHIM_AHMED_NSC2025001',
        class_name: 'Class 9',
        section_name: 'A',
        profile: {
          id: 'b0000000-0000-0000-0000-000000000003',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'rahim.ahmed@northernstar.edu.bd',
          full_name: 'Rahim Ahmed',
          role: 'student',
          phone: '+880 1799-887766',
          avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
          gender: 'male',
          date_of_birth: '2010-05-14',
          blood_group: 'B+',
          address: 'House 42, Road 11, Uttara, Dhaka',
          is_active: true,
        },
      },
      {
        id: 'st000000-0000-0000-0000-000000000002',
        profile_id: 'b0000000-0000-0000-0000-000000000006',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id_code: 'NSC2025002',
        class_id: 'e0000000-0000-0000-0000-000000000009',
        section_id: 'f0000000-0000-0000-0000-000000000001',
        roll_number: 2,
        admission_date: '2024-01-11',
        status: 'active',
        qr_code_token: 'NSSC_QR_TOKEN_SECURE_SADIA_ISLAM_NSC2025002',
        class_name: 'Class 9',
        section_name: 'A',
        profile: {
          id: 'b0000000-0000-0000-0000-000000000006',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'sadia.islam@northernstar.edu.bd',
          full_name: 'Sadia Islam',
          role: 'student',
          phone: '+880 1788-223344',
          avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
          gender: 'female',
          date_of_birth: '2010-08-22',
          blood_group: 'A+',
          address: 'Sector 4, Uttara, Dhaka',
          is_active: true,
        },
      },
      {
        id: 'st000000-0000-0000-0000-000000000003',
        profile_id: 'b0000000-0000-0000-0000-000000000007',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id_code: 'NSC2025003',
        class_id: 'e0000000-0000-0000-0000-000000000010',
        section_id: 'f0000000-0000-0000-0000-000000000003',
        roll_number: 1,
        admission_date: '2023-01-15',
        status: 'active',
        qr_code_token: 'NSSC_QR_TOKEN_SECURE_TAHSIN_ALAM_NSC2025003',
        class_name: 'Class 10',
        section_name: 'A',
        profile: {
          id: 'b0000000-0000-0000-0000-000000000007',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'tahsin.alam@northernstar.edu.bd',
          full_name: 'Tahsin Alam',
          role: 'student',
          phone: '+880 1755-998877',
          avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          gender: 'male',
          date_of_birth: '2009-03-10',
          blood_group: 'O+',
          address: 'Nikunja 2, Dhaka',
          is_active: true,
        },
      },
    ];
  },

  // 4. TEACHERS & STAFF
  async getTeachers(): Promise<Teacher[]> {
    return [
      {
        id: 't0000000-0000-0000-0000-000000000001',
        profile_id: 'b0000000-0000-0000-0000-000000000002',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        employee_id_code: 'NST202501',
        qualification: 'M.Sc. in Mathematics, University of Dhaka',
        specialization: 'Higher Mathematics & Calculus',
        salary: 65000,
        department_name: 'Mathematics',
        designation_title: 'Senior Lecturer',
        profile: {
          id: 'b0000000-0000-0000-0000-000000000002',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'tanvir.hasan@northernstar.edu.bd',
          full_name: 'Mr. Tanvir Hasan',
          role: 'teacher',
          phone: '+880 1712-345678',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          gender: 'male',
          is_active: true,
        },
      },
      {
        id: 't0000000-0000-0000-0000-000000000002',
        profile_id: 'b0000000-0000-0000-0000-000000000008',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        employee_id_code: 'NST202502',
        qualification: 'Ph.D. in Physics, BUET',
        specialization: 'Physics & Experimental Sciences',
        salary: 72000,
        department_name: 'Natural Sciences',
        designation_title: 'Assistant Professor',
        profile: {
          id: 'b0000000-0000-0000-0000-000000000008',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'shafiqul.alam@northernstar.edu.bd',
          full_name: 'Dr. Shafiqul Alam',
          role: 'teacher',
          phone: '+880 1713-987654',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          gender: 'male',
          is_active: true,
        },
      },
    ];
  },

  async getStaff(): Promise<Staff[]> {
    return [
      {
        id: 'stf00000-0000-0000-0000-000000000001',
        profile_id: 'b0000000-0000-0000-0000-000000000005',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        employee_id_code: 'NSS202501',
        salary: 42000,
        department_name: 'Administration',
        designation_title: 'Administrative Officer',
        profile: {
          id: 'b0000000-0000-0000-0000-000000000005',
          institution_id: 'a0000000-0000-0000-0000-000000000001',
          email: 'nusrat.jahan@northernstar.edu.bd',
          full_name: 'Ms. Nusrat Jahan',
          role: 'staff',
          phone: '+880 1777-654321',
          avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
          gender: 'female',
          is_active: true,
        },
      },
    ];
  },

  // 5. ATTENDANCE (Section 4.5)
  async getTodayAttendance(): Promise<AttendanceRecord[]> {
    return [
      {
        id: 'att-1',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id: 'st000000-0000-0000-0000-000000000001',
        class_id: 'e0000000-0000-0000-0000-000000000009',
        section_id: 'f0000000-0000-0000-0000-000000000001',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        check_in_time: '09:00 AM',
        remarks: 'On time for Mathematics Room 101',
        student_name: 'Rahim Ahmed',
        student_code: 'NSC2025001',
      },
      {
        id: 'att-2',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id: 'st000000-0000-0000-0000-000000000002',
        class_id: 'e0000000-0000-0000-0000-000000000009',
        section_id: 'f0000000-0000-0000-0000-000000000001',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        check_in_time: '08:55 AM',
        remarks: 'Present',
        student_name: 'Sadia Islam',
        student_code: 'NSC2025002',
      },
      {
        id: 'att-3',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        student_id: 'st000000-0000-0000-0000-000000000003',
        class_id: 'e0000000-0000-0000-0000-000000000010',
        section_id: 'f0000000-0000-0000-0000-000000000003',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        check_in_time: '09:12 AM',
        remarks: 'Late - Traffic',
        student_name: 'Tahsin Alam',
        student_code: 'NSC2025003',
      },
    ];
  },

  // 6. EXAMINATION & RESULTS (Section 4.6 - Matches UI showcase: Term Final Exam, GPA 4.95, A+, 1st Position)
  async getStudentResult(studentId: string): Promise<ExamResult> {
    return {
      id: 'res00000-0000-0000-0000-000000000001',
      examination_id: 'ex000000-0000-0000-0000-000000000001',
      student_id: studentId,
      total_marks: 294,
      gpa: 4.95,
      grade: 'A+',
      position_in_class: 1,
      remarks: 'Outstanding academic performance. Ranked 1st in Class 9-A.',
      student_name: 'Rahim Ahmed',
      student_code: 'NSC2025001',
      class_name: 'Class 9',
      section_name: 'A',
      subject_marks: [
        { id: 'sm1', examination_id: 'ex1', subject_id: 'sub1', student_id: studentId, subject_name: 'Mathematics', marks_obtained: 99, highest_marks: 99 },
        { id: 'sm2', examination_id: 'ex1', subject_id: 'sub2', student_id: studentId, subject_name: 'Physics', marks_obtained: 98, highest_marks: 98 },
        { id: 'sm3', examination_id: 'ex1', subject_id: 'sub3', student_id: studentId, subject_name: 'English', marks_obtained: 97, highest_marks: 97 },
      ],
    };
  },

  // 7. FEES & PAYMENTS (Section 4.7 - Matches UI showcase: Paid in Full ৳ 5,000)
  async getStudentFeeStatus(studentId: string) {
    return {
      status: 'Paid in Full',
      amount: 5000,
      currency: '৳',
      isPaid: true,
      paymentHistory: [
        { id: 'p1', month: 'Nov 2025', amount: 5000, status: 'Paid', receipt: 'REC-2025-11001', date: 'Nov 05, 2025' },
        { id: 'p2', month: 'Oct 2025', amount: 5000, status: 'Paid', receipt: 'REC-2025-10045', date: 'Oct 06, 2025' },
        { id: 'p3', month: 'Sep 2025', amount: 5000, status: 'Paid', receipt: 'REC-2025-09022', date: 'Sep 04, 2025' },
      ],
    };
  },

  // 8. LIBRARY CATALOGUE (Section 4.9 - Matches UI: Science Today, Mathematics Guide, English Grammar)
  async getLibraryBooks(): Promise<Book[]> {
    return [
      {
        id: 'bk1',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        title: 'Science Today',
        author: 'Dr. Farhad Hossain',
        isbn: '978-0123456789',
        category_name: 'Educational',
        available_copies: 5,
        total_copies: 5,
        cover_image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=150',
      },
      {
        id: 'bk2',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        title: 'Mathematics Guide',
        author: 'Prof. Nazmul Haque',
        isbn: '978-0987654321',
        category_name: 'Educational',
        available_copies: 8,
        total_copies: 10,
        cover_image_url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150',
      },
      {
        id: 'bk3',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        title: 'English Grammar in Use',
        author: 'Raymond Murphy',
        isbn: '978-1108457651',
        category_name: 'Language',
        available_copies: 4,
        total_copies: 6,
        cover_image_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=150',
      },
    ];
  },

  // 9. TRANSPORT FLEET (Section 4.10 - 12 Registered Buses, Bus #03)
  async getVehicles(): Promise<Vehicle[]> {
    return [
      { id: 'v3', institution_id: 'a0000000-0000-0000-0000-000000000001', vehicle_number: 'Bus #03', vehicle_type: 'AC Campus Shuttle', capacity: 40, driver_name: 'Md. Moklesur Rahman', driver_phone: '+880 1711-223344', status: 'active' },
      { id: 'v1', institution_id: 'a0000000-0000-0000-0000-000000000001', vehicle_number: 'Bus #01', vehicle_type: 'Standard School Bus', capacity: 50, driver_name: 'Abdul Karim', driver_phone: '+880 1711-223345', status: 'active' },
      { id: 'v2', institution_id: 'a0000000-0000-0000-0000-000000000001', vehicle_number: 'Bus #02', vehicle_type: 'Standard School Bus', capacity: 50, driver_name: 'Jahangir Alam', driver_phone: '+880 1711-223346', status: 'active' },
    ];
  },

  // 10. RECENT ACTIVITIES & EVENTS (Matches Dashboard Web UI)
  async getRecentActivities() {
    return [
      { id: 'act-1', text: 'New student admitted: Rahim Ahmed', time: '2 minutes ago', type: 'student' },
      { id: 'act-2', text: 'Fee payment received: Tk. 5,000', time: '5 minutes ago', type: 'finance' },
      { id: 'act-3', text: 'New notice published: Examination Schedule', time: '10 minutes ago', type: 'notice' },
      { id: 'act-4', text: 'Bus #03 arrived at school gate', time: '15 minutes ago', type: 'transport' },
      { id: 'act-5', text: 'Attendance updated for Class 10-A', time: '20 minutes ago', type: 'attendance' },
    ];
  },

  async getUpcomingEvents(): Promise<EventItem[]> {
    return [
      {
        id: 'ev-1',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        title: 'Annual Examination – Class 9-12',
        description: 'Comprehensive annual examinations across high school and college',
        event_type: 'examination',
        start_datetime: '2025-11-15 08:00:00',
        end_datetime: '2025-11-15 12:00:00',
        location: 'Main Exam Halls',
      },
      {
        id: 'ev-2',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        title: 'Parent-Teacher Meeting',
        description: 'Term review and progress conference',
        event_type: 'meeting',
        start_datetime: '2025-11-17 10:00:00',
        end_datetime: '2025-11-17 13:00:00',
        location: 'Auditorium & Classrooms',
      },
      {
        id: 'ev-3',
        institution_id: 'a0000000-0000-0000-0000-000000000001',
        title: 'Science Fair',
        description: 'Annual STEM exhibition and project competition',
        event_type: 'event',
        start_datetime: '2025-11-20 09:00:00',
        end_datetime: '2025-11-20 16:00:00',
        location: 'Campus Courtyard',
      },
    ];
  },

  // 11. NOTIFICATIONS
  async getNotifications(userId?: string): Promise<NotificationItem[]> {
    return [
      { id: 'n1', institution_id: 'inst1', user_id: 'u1', title: 'Exam Schedule', message: 'Annual Examination routine has been published for Class 9 & 10.', notification_type: 'exam', is_read: false, created_at: 'Nov 15, 2025' },
      { id: 'n2', institution_id: 'inst1', user_id: 'u1', title: 'Fee Reminder', message: 'Please pay monthly tuition by Nov 20 to avoid late charges.', notification_type: 'fee', is_read: false, created_at: 'Nov 14, 2025' },
      { id: 'n3', institution_id: 'inst1', user_id: 'u1', title: 'Sports Day', message: 'Annual Sports Day scheduled for Nov 25, 2025. Sign up with your house captain.', notification_type: 'general', is_read: true, created_at: 'Nov 10, 2025' },
      { id: 'n4', institution_id: 'inst1', user_id: 'u1', title: 'New Library Books', message: 'New curriculum references have arrived in the library. Check them out!', notification_type: 'general', is_read: true, created_at: 'Nov 08, 2025' },
    ];
  },
};
