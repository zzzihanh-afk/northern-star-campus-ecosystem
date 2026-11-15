import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';
import '../../models/user_profile.dart';

class TeacherHomeScreen extends StatelessWidget {
  final Function(String route) onNavigate;
  final UserProfile? userProfile;

  const TeacherHomeScreen({
    Key? key,
    required this.onNavigate,
    this.userProfile,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Teacher Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF047857), Color(0xFF059669), Color(0xFF10B981)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF059669).withOpacity(0.3),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white, width: 2),
                    image: DecorationImage(
                      image: NetworkImage(userProfile?.avatarUrl ?? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                const SizedBox(width: 14),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      userProfile?.fullName ?? 'Mr. Tanvir Hasan',
                      style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w800),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Teacher (${userProfile?.department ?? "Mathematics"})',
                      style: const TextStyle(color: Color(0xFFD1FAE5), fontSize: 12, fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 1),
                    Text(
                      'ID: ${userProfile?.studentIdCode ?? "TCH2025001"}',
                      style: const TextStyle(color: Color(0xFFA7F3D0), fontSize: 10, fontFamily: 'monospace', fontWeight: FontWeight.w700),
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          // 6 Teacher Quick Actions
          GridView.count(
            crossAxisCount: 3,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 10,
            crossAxisSpacing: 10,
            children: [
              _buildTeacherAction('Take Attendance', Icons.how_to_reg, const Color(0xFF2563EB), () => onNavigate('attendance')),
              _buildTeacherAction('Upload Homework', Icons.cloud_upload, const Color(0xFF059669), () => onNavigate('homework')),
              _buildTeacherAction('Enter Marks', Icons.assignment_turned_in, const Color(0xFF0D9488), () => onNavigate('results')),
              _buildTeacherAction('My Classes', Icons.school, const Color(0xFF4F46E5), () {}),
              _buildTeacherAction('Schedule', Icons.calendar_today, const Color(0xFF0284C7), () {}),
              _buildTeacherAction('Messages', Icons.chat_bubble_outline, const Color(0xFF0891B2), () => onNavigate('notifications')),
            ],
          ),

          const SizedBox(height: 18),

          // Today's Classes for Teacher
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    Text('Today\'s Classes', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
                    Text('View All →', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: CampusTheme.royalBlue)),
                  ],
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFF6FF),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: const Color(0xFFBFDBFE)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.menu_book, color: CampusTheme.royalBlue, size: 24),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text('Mathematics', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
                            Text('Class: 9-A • Time: 9:00 AM - 10:00 AM', style: TextStyle(fontSize: 11, color: Color(0xFF64748B))),
                          ],
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: CampusTheme.royalBlue,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        child: const Text('Join', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTeacherAction(String label, IconData icon, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle),
              child: Icon(icon, color: color, size: 22),
            ),
            const SizedBox(height: 6),
            Text(label, textAlign: TextAlign.center, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: CampusTheme.navyDark)),
          ],
        ),
      ),
    );
  }
}
