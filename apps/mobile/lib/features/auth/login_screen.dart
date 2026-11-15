import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';
import '../../models/user_profile.dart';

class LoginScreen extends StatefulWidget {
  final Function(UserProfile userProfile) onLoginSuccess;

  const LoginScreen({Key? key, required this.onLoginSuccess}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _nameController = TextEditingController();
  final _idPasswordController = TextEditingController();
  bool _obscurePassword = true;
  String? _errorMessage;
  bool _isLoading = false;

  // Registered campus directory
  static final List<UserProfile> _registeredProfiles = [
    // Students
    UserProfile(
      id: 'st-001',
      email: 'rahim.ahmed@northernstar.edu.bd',
      fullName: 'Rahim Ahmed',
      role: UserRole.student,
      studentIdCode: 'NSC2025001',
      className: 'Class 9',
      sectionName: 'A',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      phone: '+880 1799-112233',
    ),
    UserProfile(
      id: 'st-002',
      email: 'sumaiya.akter@northernstar.edu.bd',
      fullName: 'Sumaiya Akter',
      role: UserRole.student,
      studentIdCode: 'NSC2025002',
      className: 'Class 10',
      sectionName: 'B',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      phone: '+880 1711-223344',
    ),
    UserProfile(
      id: 'st-003',
      email: 'fahim.faysal@northernstar.edu.bd',
      fullName: 'Fahim Faysal',
      role: UserRole.student,
      studentIdCode: 'NSC2025003',
      className: 'Class 11',
      sectionName: 'Science',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      phone: '+880 1812-345678',
    ),
    UserProfile(
      id: 'st-004',
      email: 'nafisa.khan@northernstar.edu.bd',
      fullName: 'Nafisa Khan',
      role: UserRole.student,
      studentIdCode: 'NSC2025004',
      className: 'Class 12',
      sectionName: 'Science',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      phone: '+880 1913-456789',
    ),
    // Teachers
    UserProfile(
      id: 'tch-001',
      email: 'tanvir.hasan@northernstar.edu.bd',
      fullName: 'Tanvir Hasan',
      role: UserRole.teacher,
      studentIdCode: 'TCH2025001',
      department: 'Mathematics & Physics',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      phone: '+880 1712-345678',
    ),
    UserProfile(
      id: 'tch-002',
      email: 'farhad.hossain@northernstar.edu.bd',
      fullName: 'Dr. Farhad Hossain',
      role: UserRole.teacher,
      studentIdCode: 'TCH2025002',
      department: 'Natural Sciences',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      phone: '+880 1819-876543',
    ),
    // Parents
    UserProfile(
      id: 'prn-001',
      email: 'fatema.akter@northernstar.edu.bd',
      fullName: 'Mrs. Fatema Akter',
      role: UserRole.parent,
      studentIdCode: 'PRN2025001',
      childName: 'Rahim Ahmed (Class 9-A)',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      phone: '+880 1811-223344',
    ),
    // Staff
    UserProfile(
      id: 'stf-001',
      email: 'nusrat.jahan@northernstar.edu.bd',
      fullName: 'Ms. Nusrat Jahan',
      role: UserRole.staff,
      studentIdCode: 'STF2025001',
      department: 'Academic Administration',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      phone: '+880 1911-223344',
    ),
  ];

  void _handleLogin() {
    final nameInput = _nameController.text.trim();
    final idInput = _idPasswordController.text.trim();

    if (nameInput.isEmpty || idInput.isEmpty) {
      setState(() {
        _errorMessage = 'Please enter both your Full Name and ID Number (Password).';
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    Future.delayed(const Duration(milliseconds: 300), () {
      if (!mounted) return;

      // 1. Try to find exact match in registered directory (case insensitive)
      UserProfile? matchedProfile;
      for (final profile in _registeredProfiles) {
        final nameMatches = profile.fullName.toLowerCase().replaceAll('.', '') ==
            nameInput.toLowerCase().replaceAll('.', '');
        final idMatches = (profile.studentIdCode ?? '').toLowerCase() == idInput.toLowerCase();

        if (nameMatches && idMatches) {
          matchedProfile = profile;
          break;
        }
      }

      // 2. If not found by exact full name + id, check if ID matches a known user
      if (matchedProfile == null) {
        for (final profile in _registeredProfiles) {
          if ((profile.studentIdCode ?? '').toLowerCase() == idInput.toLowerCase()) {
            matchedProfile = profile;
            break;
          }
        }
      }

      // 3. Fallback: Allow dynamic entry with Name and ID number
      if (matchedProfile == null) {
        final upperId = idInput.toUpperCase();
        UserRole detectedRole = UserRole.student;
        String? dept;
        String? className = 'Class 9';
        String? section = 'A';

        if (upperId.startsWith('TCH') || upperId.contains('TEACH')) {
          detectedRole = UserRole.teacher;
          dept = 'Faculty';
        } else if (upperId.startsWith('PRN') || upperId.contains('PARENT')) {
          detectedRole = UserRole.parent;
        } else if (upperId.startsWith('STF') || upperId.contains('STAFF')) {
          detectedRole = UserRole.staff;
          dept = 'Operations';
        }

        matchedProfile = UserProfile(
          id: 'user-${DateTime.now().millisecondsSinceEpoch}',
          email: '${nameInput.toLowerCase().replaceAll(' ', '.')}@northernstar.edu.bd',
          fullName: nameInput,
          role: detectedRole,
          studentIdCode: idInput,
          className: className,
          sectionName: section,
          department: dept,
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        );
      }

      setState(() => _isLoading = false);
      widget.onLoginSuccess(matchedProfile);
    });
  }

  void _fillDemo(String name, String id) {
    setState(() {
      _nameController.text = name;
      _idPasswordController.text = id;
      _errorMessage = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: CampusTheme.navyDark,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Emblem & Institution Header
                Image.asset('assets/images/logo.png', width: 85, height: 85),
                const SizedBox(height: 14),
                const Text(
                  'NORTHERN STAR',
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                    letterSpacing: 1.2,
                  ),
                ),
                const Text(
                  'SCHOOL & COLLEGE',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: CampusTheme.goldAccent,
                    letterSpacing: 1.0,
                  ),
                ),
                const Text(
                  'Learn • Grow • Excel',
                  style: TextStyle(
                    fontSize: 11,
                    fontStyle: FontStyle.italic,
                    color: Color(0xFF94A3B8),
                  ),
                ),

                const SizedBox(height: 26),

                // Login Form Card
                Container(
                  padding: const EdgeInsets.all(22),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(24),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.25),
                        blurRadius: 20,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Campus Identity Access',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w900,
                          color: CampusTheme.navyDark,
                        ),
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'Enter your full name and assigned institutional ID number as your password to authenticate.',
                        style: TextStyle(fontSize: 11, color: Color(0xFF64748B), height: 1.3),
                      ),

                      const SizedBox(height: 18),

                      // Input 1: Full Name
                      const Text(
                        'Full Name',
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: CampusTheme.navyDark),
                      ),
                      const SizedBox(height: 6),
                      TextField(
                        controller: _nameController,
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                        decoration: InputDecoration(
                          hintText: 'e.g. Rahim Ahmed',
                          prefixIcon: const Icon(Icons.person_outline, size: 20, color: Color(0xFF64748B)),
                          filled: true,
                          fillColor: const Color(0xFFF8FAFC),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: CampusTheme.royalBlue, width: 1.5),
                          ),
                        ),
                      ),

                      const SizedBox(height: 14),

                      // Input 2: ID Number (Password)
                      const Text(
                        'ID Number (Password)',
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: CampusTheme.navyDark),
                      ),
                      const SizedBox(height: 6),
                      TextField(
                        controller: _idPasswordController,
                        obscureText: _obscurePassword,
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, letterSpacing: 1.0),
                        decoration: InputDecoration(
                          hintText: 'e.g. NSC2025001',
                          prefixIcon: const Icon(Icons.badge_outlined, size: 20, color: Color(0xFF64748B)),
                          suffixIcon: IconButton(
                            icon: Icon(
                              _obscurePassword ? Icons.visibility_off : Icons.visibility,
                              size: 18,
                              color: const Color(0xFF64748B),
                            ),
                            onPressed: () {
                              setState(() => _obscurePassword = !_obscurePassword);
                            },
                          ),
                          filled: true,
                          fillColor: const Color(0xFFF8FAFC),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: CampusTheme.royalBlue, width: 1.5),
                          ),
                        ),
                      ),

                      if (_errorMessage != null) ...[
                        const SizedBox(height: 12),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFEF2F2),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: const Color(0xFFFECACA)),
                          ),
                          child: Row(
                            children: [
                              const Icon(Icons.error_outline, size: 16, color: Color(0xFFDC2626)),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  _errorMessage!,
                                  style: const TextStyle(fontSize: 11, color: Color(0xFFDC2626), fontWeight: FontWeight.w600),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],

                      const SizedBox(height: 20),

                      // Submit Button
                      SizedBox(
                        width: double.infinity,
                        height: 48,
                        child: ElevatedButton(
                          onPressed: _isLoading ? null : _handleLogin,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: CampusTheme.royalBlue,
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            elevation: 0,
                          ),
                          child: _isLoading
                              ? const SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                                )
                              : const Text(
                                  'Enter Campus App',
                                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800),
                                ),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 22),

                // Quick Demo Accounts Fill for convenience
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: Colors.white.withOpacity(0.12)),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        '⚡ Quick Demo Credentials (Tap to Auto-fill)',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: CampusTheme.goldAccent),
                      ),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        alignment: WrapAlignment.center,
                        children: [
                          _buildQuickFillChip('🎓 Student: Rahim Ahmed', 'Rahim Ahmed', 'NSC2025001'),
                          _buildQuickFillChip('🎓 Student: Sumaiya Akter', 'Sumaiya Akter', 'NSC2025002'),
                          _buildQuickFillChip('👨‍🏫 Teacher: Tanvir Hasan', 'Tanvir Hasan', 'TCH2025001'),
                          _buildQuickFillChip('👥 Parent: Fatema Akter', 'Mrs. Fatema Akter', 'PRN2025001'),
                          _buildQuickFillChip('💼 Staff: Nusrat Jahan', 'Ms. Nusrat Jahan', 'STF2025001'),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildQuickFillChip(String label, String name, String id) {
    return InkWell(
      onTap: () => _fillDemo(name, id),
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.12),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: Colors.white.withOpacity(0.18)),
        ),
        child: Text(
          label,
          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: Colors.white),
        ),
      ),
    );
  }
}
