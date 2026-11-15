import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';
import '../../config/remote_config_manager.dart';

class StudentHomeScreen extends StatelessWidget {
  final Function(String route) onNavigate;

  const StudentHomeScreen({Key? key, required this.onNavigate}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final remoteConfig = RemoteConfigManager();

    return ListenableBuilder(
      listenable: remoteConfig,
      builder: (context, _) {
        return SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Student Header Profile Card (Matching Design Reference 3)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF1D4ED8), Color(0xFF2563EB), Color(0xFF38BDF8)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF2563EB).withOpacity(0.3),
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
                        image: const DecorationImage(
                          image: NetworkImage('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    const SizedBox(width: 14),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Rahim Ahmed',
                          style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w800),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'Class: 9-A',
                          style: TextStyle(color: Color(0xFFE0F2FE), fontSize: 12, fontWeight: FontWeight.w600),
                        ),
                        SizedBox(height: 1),
                        Text(
                          'ID: NSC2025001',
                          style: TextStyle(color: Color(0xFFBAE6FD), fontSize: 11, fontFamily: 'monospace', fontWeight: FontWeight.w700),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 18),

              // Today's Classes Section
              Container(
                padding: const EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 6, offset: const Offset(0, 2)),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text('Today\'s Classes', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
                        Text('View All →', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: CampusTheme.royalBlue)),
                      ],
                    ),
                    const SizedBox(height: 12),
                    _buildClassItem('Mathematics', 'Room 101 • 9:00 AM', isCompleted: true),
                    const SizedBox(height: 8),
                    _buildClassItem('Physics', 'Room 102 • 10:00 AM', isInProgress: true),
                    const SizedBox(height: 8),
                    _buildClassItem('English', 'Room 103 • 11:00 AM'),
                  ],
                ),
              ),

              const SizedBox(height: 18),

              // 6 Features Action Grid (Dynamically Controlled by Web Central Admin!)
              GridView.count(
                crossAxisCount: 3,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
                children: [
                  if (remoteConfig.isModuleEnabled('attendance'))
                    _buildFeatureCard('Attendance', Icons.calendar_month, const Color(0xFF10B981), () => onNavigate('attendance')),
                  if (remoteConfig.isModuleEnabled('homework'))
                    _buildFeatureCard('Homework', Icons.menu_book, const Color(0xFF2563EB), () => onNavigate('homework')),
                  if (remoteConfig.isModuleEnabled('results'))
                    _buildFeatureCard('Results', Icons.military_tech, const Color(0xFF4F46E5), () => onNavigate('results')),
                  if (remoteConfig.isModuleEnabled('routine'))
                    _buildFeatureCard('Routine', Icons.schedule, const Color(0xFF9333EA), () => onNavigate('routine')),
                  if (remoteConfig.isModuleEnabled('fees'))
                    _buildFeatureCard('Fee Status', Icons.credit_card, const Color(0xFFD97706), () => onNavigate('fees')),
                  if (remoteConfig.isModuleEnabled('library'))
                    _buildFeatureCard('Library', Icons.local_library, const Color(0xFF0284C7), () => onNavigate('library')),
                ],
              ),

              const SizedBox(height: 18),

              // Digital ID Access Card
              if (remoteConfig.isModuleEnabled('digital_id'))
                InkWell(
                  onTap: () => onNavigate('digital_id'),
                  borderRadius: BorderRadius.circular(18),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [CampusTheme.navyDark, CampusTheme.navyPrimary],
                      ),
                      borderRadius: BorderRadius.circular(18),
                      boxShadow: [
                        BoxShadow(color: CampusTheme.navyDark.withOpacity(0.2), blurRadius: 8, offset: const Offset(0, 3)),
                      ],
                    ),
                    child: Row(
                      children: const [
                        Icon(Icons.qr_code_2, color: CampusTheme.goldAccent, size: 28),
                        SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Digital Student ID Pass', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 13)),
                              Text('Tap to display encrypted QR code', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10)),
                            ],
                          ),
                        ),
                        Icon(Icons.chevron_right, color: Colors.white70),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildClassItem(String title, String subtitle, {bool isCompleted = false, bool isInProgress = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFF1F5F9)),
      ),
      child: Row(
        children: [
          Icon(
            isCompleted ? Icons.check_circle : (isInProgress ? Icons.radio_button_checked : Icons.radio_button_unchecked),
            color: isCompleted ? const Color(0xFF10B981) : (isInProgress ? const Color(0xFF2563EB) : const Color(0xFF94A3B8)),
            size: 18,
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 12, color: CampusTheme.navyDark)),
                Text(subtitle, style: const TextStyle(fontSize: 10, color: Color(0xFF64748B))),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureCard(String label, IconData icon, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFE2E8F0)),
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 4, offset: const Offset(0, 2)),
          ],
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
            Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: CampusTheme.navyDark)),
          ],
        ),
      ),
    );
  }
}
