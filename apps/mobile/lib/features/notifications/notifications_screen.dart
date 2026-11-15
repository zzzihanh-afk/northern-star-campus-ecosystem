import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Tabs: All / Unread
            Row(
              children: [
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: CampusTheme.royalBlue,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
                  ),
                  child: const Text('All', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 11)),
                ),
                const SizedBox(width: 8),
                OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF64748B),
                    side: const BorderSide(color: Color(0xFFE2E8F0)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
                  ),
                  child: const Text('Unread (2)', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 11)),
                ),
              ],
            ),

            const SizedBox(height: 16),

            _buildNotificationItem(
              'Exam Schedule',
              'Nov 15, 2025',
              Icons.assignment_outlined,
              const Color(0xFF7C3AED),
            ),
            const SizedBox(height: 12),
            _buildNotificationItem(
              'Fee Reminder',
              'Please pay by Nov 20',
              Icons.receipt_long_outlined,
              const Color(0xFFD97706),
            ),
            const SizedBox(height: 12),
            _buildNotificationItem(
              'Sports Day',
              'Nov 25, 2025',
              Icons.emoji_events_outlined,
              const Color(0xFF0284C7),
            ),
            const SizedBox(height: 12),
            _buildNotificationItem(
              'New Library Books',
              'Check now!',
              Icons.local_library_outlined,
              const Color(0xFF059669),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNotificationItem(String title, String subtitle, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
                const SizedBox(height: 2),
                Text(subtitle, style: const TextStyle(fontSize: 11, color: Color(0xFF64748B))),
              ],
            ),
          ),
          const Icon(Icons.chevron_right, color: Color(0xFFCBD5E1), size: 18),
        ],
      ),
    );
  }
}
