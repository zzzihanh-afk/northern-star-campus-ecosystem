import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';
import '../../models/user_profile.dart';

class ParentHomeScreen extends StatelessWidget {
  final Function(String route) onNavigate;
  final UserProfile? userProfile;

  const ParentHomeScreen({
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
          // Parent Profile Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF6B21A8), Color(0xFF7E22CE), Color(0xFF9333EA)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF7E22CE).withOpacity(0.3),
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
                      image: NetworkImage(userProfile?.avatarUrl ?? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                const SizedBox(width: 14),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      userProfile?.fullName ?? 'Mrs. Fatema Akter',
                      style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w800),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      userProfile?.childName != null
                          ? 'Parent of ${userProfile!.childName}'
                          : 'Parent • ID: ${userProfile?.studentIdCode ?? "PRN2025001"}',
                      style: const TextStyle(color: Color(0xFFF3E8FF), fontSize: 12, fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Live Child Presence Status
          Container(
            padding: const EdgeInsets.all(14.0),
            decoration: BoxDecoration(
              color: const Color(0xFFECFDF5),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFA7F3D0)),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(6),
                  decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle),
                  child: const Icon(Icons.check, color: Colors.white, size: 16),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      'Your child is present today',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Color(0xFF064E3B)),
                    ),
                    Text(
                      '9:00 AM • Mathematics Room 101',
                      style: TextStyle(fontSize: 10, color: Color(0xFF047857), fontWeight: FontWeight.w500),
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          const Text('Child Overview', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
          const SizedBox(height: 10),

          // 4 Child Overview Cards
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 10,
            crossAxisSpacing: 10,
            childAspectRatio: 1.4,
            children: [
              _buildOverviewCard('Attendance', '96%', const Color(0xFF10B981), Icons.groups, () => onNavigate('attendance')),
              _buildOverviewCard('Results', 'A+', const Color(0xFF2563EB), Icons.military_tech, () => onNavigate('results')),
              _buildOverviewCard('Fee Status', 'Paid', const Color(0xFFD97706), Icons.credit_card, () => onNavigate('fees')),
              _buildOverviewCard('Notices', '3', const Color(0xFF8B5CF6), Icons.notifications, () => onNavigate('notifications')),
            ],
          ),

          const SizedBox(height: 18),

          // Recent Updates Section
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
                    Text('Recent Updates', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
                    Text('View All →', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: CampusTheme.royalBlue)),
                  ],
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8FAFC),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.people_alt_outlined, color: CampusTheme.royalBlue, size: 20),
                      const SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Parent-Teacher Meeting', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: CampusTheme.navyDark)),
                          Text('Tomorrow at 10:00 AM • Main Auditorium', style: TextStyle(fontSize: 10, color: Color(0xFF64748B))),
                        ],
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

  Widget _buildOverviewCard(String label, String value, Color color, IconData icon, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF64748B))),
                Icon(icon, color: color, size: 18),
              ],
            ),
            Text(value, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: color)),
          ],
        ),
      ),
    );
  }
}
