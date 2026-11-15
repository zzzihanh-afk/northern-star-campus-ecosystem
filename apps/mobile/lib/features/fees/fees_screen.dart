import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';

class FeesScreen extends StatelessWidget {
  const FeesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Fee Status'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Status Paid Card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Column(
                children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle),
                    child: const Icon(Icons.check, color: Colors.white, size: 28),
                  ),
                  const SizedBox(height: 12),
                  const Text('Paid in Full', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
                  const SizedBox(height: 2),
                  const Text('৳ 5,000', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Color(0xFF10B981))),
                ],
              ),
            ),

            const SizedBox(height: 18),

            // Payment History
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: const [
                      Text('Payment History', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
                      Text('View All →', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: CampusTheme.royalBlue)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _buildHistoryItem('Nov 2025', 'REC-2025-11001', '৳ 5,000', 'Paid'),
                  const Divider(height: 16, color: Color(0xFFF1F5F9)),
                  _buildHistoryItem('Oct 2025', 'REC-2025-10045', '৳ 5,000', 'Paid'),
                  const Divider(height: 16, color: Color(0xFFF1F5F9)),
                  _buildHistoryItem('Sep 2025', 'REC-2025-09022', '৳ 5,000', 'Paid'),
                ],
              ),
            ),

            const SizedBox(height: 24),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Online Payment Gateway interface ready.')),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: CampusTheme.royalBlue,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                child: const Text('Pay Online', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHistoryItem(String month, String receipt, String amount, String status) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.between,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(month, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 12, color: CampusTheme.navyDark)),
            Text(receipt, style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8), fontFamily: 'monospace')),
          ],
        ),
        Row(
          children: [
            Text(amount, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: CampusTheme.navyDark)),
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(color: const Color(0xFFECFDF5), borderRadius: BorderRadius.circular(6)),
              child: Text(status, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF059669))),
            ),
          ],
        ),
      ],
    );
  }
}
