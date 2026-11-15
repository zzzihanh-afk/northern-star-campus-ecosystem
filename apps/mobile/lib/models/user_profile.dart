enum UserRole {
  student,
  parent,
  teacher,
  staff,
  admin,
  superAdmin,
}

class UserProfile {
  final String id;
  final String email;
  final String fullName;
  final UserRole role;
  final String? phone;
  final String? avatarUrl;
  final String? studentIdCode;
  final String? className;
  final String? sectionName;
  final String? department;
  final String? childName;

  UserProfile({
    required this.id,
    required this.email,
    required this.fullName,
    required this.role,
    this.phone,
    this.avatarUrl,
    this.studentIdCode,
    this.className,
    this.sectionName,
    this.department,
    this.childName,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    UserRole parsedRole = UserRole.student;
    switch (json['role']) {
      case 'parent':
        parsedRole = UserRole.parent;
        break;
      case 'teacher':
        parsedRole = UserRole.teacher;
        break;
      case 'staff':
        parsedRole = UserRole.staff;
        break;
      case 'super_admin':
        parsedRole = UserRole.superAdmin;
        break;
      case 'admin':
        parsedRole = UserRole.admin;
        break;
      default:
        parsedRole = UserRole.student;
    }

    return UserProfile(
      id: json['id'] ?? '',
      email: json['email'] ?? '',
      fullName: json['full_name'] ?? '',
      role: parsedRole,
      phone: json['phone'],
      avatarUrl: json['avatar_url'],
      studentIdCode: json['student_id_code'],
      className: json['class_name'],
      sectionName: json['section_name'],
      department: json['department'],
      childName: json['child_name'],
    );
  }
}
