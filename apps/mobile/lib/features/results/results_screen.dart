import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';

class ResultsScreen extends StatelessWidget {
  const ResultsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Results'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Term Selector & Grade Badge Card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFFEFF6FF),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: const Color(0xFFBFDBFE)),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('Term Final Exam', style: TextStyle(color: CampusTheme.royalBlue, fontWeight: FontWeight.w700, fontSize: 12)),
                        SizedBox(width: 4),
                        Icon(Icons.keyboard_arrow_down, color: CampusTheme.royalBlue, size: 16),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Laurel Badge A+
                  Container(
                    width: 70,
                    height: 70,
                    decoration: BoxDecoration(
                      color: const Color(0xFFFEF3C7),
                      shape: BoxShape.circle,
                      border: Border.all(color: CampusTheme.goldAccent, width: 2),
                    ),
                    child: const Center(
                      child: Text('A+', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Color(0xFFD97706))),
                    ),
                  ),

                  const SizedBox(height: 12),
                  const Text('GPA: 4.95', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: CampusTheme.navyDark)),
                  const SizedBox(height: 2),
                  const Text('Position: 1st', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF64748B))),

                  const SizedBox(height: 16),

                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        backgroundColor: CampusTheme.royalBlue,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: const Text('View Full Result', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12)),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 18),

            // Subject Marks List
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
                  const Text('Subject Marks', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: CampusTheme.navyDark)),
                  const SizedBox(height: 12),
                  _buildSubjectRow('Mathematics', 99),
                  const Divider(height: 16, color: Color(0xFFF1F5F9)),
                  _buildSubjectRow('Physics', 98),
                  const Divider(height: 16, color: Color(0xFFF1F5F9)),
                  _buildSubjectRow('English', 97),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSubjectRow(String subject, int mark) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.between,
      children: [
        Text(subject, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 12, color: CampusTheme.navyDark)),
        Text('$mark', style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14, color: CampusTheme.royalBlue)),
      ],
    );
  }
}
