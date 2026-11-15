import 'package:flutter/material.dart';
import '../../core/theme/campus_theme.dart';
import '../../models/user_profile.dart';

class HomeworkItem {
  final String id;
  final String title;
  final String subject;
  final String teacher;
  final String className;
  final String dueDate;
  final String description;
  final String? attachmentName;
  String status; // 'pending', 'submitted', 'graded'
  String? submissionDate;
  String? submissionNotes;
  String? score;
  String? teacherFeedback;

  HomeworkItem({
    required this.id,
    required this.title,
    required this.subject,
    required this.teacher,
    required this.className,
    required this.dueDate,
    required this.description,
    this.attachmentName,
    this.status = 'pending',
    this.submissionDate,
    this.submissionNotes,
    this.score,
    this.teacherFeedback,
  });
}

class HomeworkScreen extends StatefulWidget {
  final UserProfile? userProfile;

  const HomeworkScreen({Key? key, this.userProfile}) : super(key: key);

  @override
  State<HomeworkScreen> createState() => _HomeworkScreenState();
}

class _HomeworkScreenState extends State<HomeworkScreen> {
  String _selectedFilter = 'All';

  final List<HomeworkItem> _homeworkList = [
    HomeworkItem(
      id: 'hw-1',
      title: 'Quadratic Equations Exercise 4.2',
      subject: 'Mathematics',
      teacher: 'Mr. Tanvir Hasan',
      className: 'Class 9-A',
      dueDate: 'Nov 17, 2026',
      description: 'Solve questions 1 through 15 on Page 88 of textbook. Show all derivation steps clearly and graph problems 7 & 12.',
      attachmentName: 'Math_Exercise_4.2_Worksheet.pdf',
      status: 'pending',
    ),
    HomeworkItem(
      id: 'hw-2',
      title: 'Newton\'s Third Law Lab Observation',
      subject: 'Physics',
      teacher: 'Dr. Farhad Hossain',
      className: 'Class 9-A',
      dueDate: 'Nov 18, 2026',
      description: 'Complete the reaction force table from Friday\'s laboratory session and calculate the percentage discrepancy for spring balances.',
      attachmentName: 'Lab_Report_Template_V2.pdf',
      status: 'pending',
    ),
    HomeworkItem(
      id: 'hw-3',
      title: 'Creative Essay: AI in Modern Education',
      subject: 'English',
      teacher: 'Ms. Nasreen Sultana',
      className: 'Class 9-A',
      dueDate: 'Nov 15, 2026',
      description: 'Write a 450-word analytical essay discussing the benefits and ethical considerations of AI tutors for secondary school students.',
      attachmentName: null,
      status: 'submitted',
      submissionDate: 'Nov 14, 2026, 8:45 PM',
      submissionNotes: 'Completed essay in 480 words. Bibliography and citations included.',
    ),
    HomeworkItem(
      id: 'hw-4',
      title: 'Python Functions & List Comprehensions',
      subject: 'ICT',
      teacher: 'Mr. Mahmudul Haque',
      className: 'Class 9-A',
      dueDate: 'Nov 10, 2026',
      description: 'Implement a program that filters prime numbers from an institutional roster array using list comprehension.',
      attachmentName: 'ICT_Coding_Assignment_3.py',
      status: 'graded',
      submissionDate: 'Nov 09, 2026, 6:30 PM',
      submissionNotes: 'All unit test cases passed with O(n) algorithmic complexity.',
      score: '96 / 100 (A+)',
      teacherFeedback: 'Outstanding logic, proper indentation, and clean variable naming conventions.',
    ),
    HomeworkItem(
      id: 'hw-5',
      title: 'Chemical Bonding & Lewis Dot Diagrams',
      subject: 'Chemistry',
      teacher: 'Dr. Farhad Hossain',
      className: 'Class 9-A',
      dueDate: 'Nov 20, 2026',
      description: 'Draw the electron valence dot diagrams for covalent compounds H2O, CH4, and NH3 with bond angle estimates.',
      attachmentName: 'Chemistry_Bonding_Guide.pdf',
      status: 'pending',
    ),
  ];

  Color _getSubjectColor(String subject) {
    switch (subject.toLowerCase()) {
      case 'mathematics':
        return const Color(0xFF2563EB);
      case 'physics':
        return const Color(0xFF7C3AED);
      case 'chemistry':
        return const Color(0xFF059669);
      case 'english':
        return const Color(0xFFD97706);
      case 'ict':
        return const Color(0xFF0284C7);
      default:
        return CampusTheme.royalBlue;
    }
  }

  IconData _getSubjectIcon(String subject) {
    switch (subject.toLowerCase()) {
      case 'mathematics':
        return Icons.calculate_outlined;
      case 'physics':
        return Icons.science_outlined;
      case 'chemistry':
        return Icons.biotech_outlined;
      case 'english':
        return Icons.auto_stories_outlined;
      case 'ict':
        return Icons.code;
      default:
        return Icons.menu_book;
    }
  }

  void _openSubmitDialog(HomeworkItem item) {
    final notesController = TextEditingController();
    bool hasAttachment = false;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Container(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                top: 20,
                bottom: MediaQuery.of(context).viewInsets.bottom + 20,
              ),
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Submit Homework',
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w900,
                              color: CampusTheme.navyDark,
                            ),
                          ),
                          Text(
                            '${item.subject} • ${item.title}',
                            style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                          ),
                        ],
                      ),
                      IconButton(
                        icon: const Icon(Icons.close, color: Colors.black54),
                        onPressed: () => Navigator.pop(ctx),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Your Submission Notes or Written Answers:',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: CampusTheme.navyDark),
                  ),
                  const SizedBox(height: 6),
                  TextField(
                    controller: notesController,
                    maxLines: 4,
                    style: const TextStyle(fontSize: 13),
                    decoration: InputDecoration(
                      hintText: 'Enter assignment details, solution summary or questions for teacher...',
                      filled: true,
                      fillColor: const Color(0xFFF8FAFC),
                      contentPadding: const EdgeInsets.all(12),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(14),
                        borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Attachment box
                  InkWell(
                    onTap: () {
                      setModalState(() {
                        hasAttachment = !hasAttachment;
                      });
                    },
                    borderRadius: BorderRadius.circular(14),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      decoration: BoxDecoration(
                        color: hasAttachment ? const Color(0xFFEFF6FF) : const Color(0xFFF8FAFC),
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(
                          color: hasAttachment ? CampusTheme.royalBlue : const Color(0xFFCBD5E1),
                          style: BorderStyle.solid,
                        ),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            hasAttachment ? Icons.check_circle : Icons.attach_file,
                            color: hasAttachment ? CampusTheme.royalBlue : const Color(0xFF64748B),
                            size: 20,
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              hasAttachment
                                  ? 'Handwritten_Solution_Pages.pdf attached'
                                  : 'Attach Homework File / Photo (PDF, JPG)',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: hasAttachment ? FontWeight.w700 : FontWeight.w500,
                                color: hasAttachment ? CampusTheme.royalBlue : const Color(0xFF64748B),
                              ),
                            ),
                          ),
                          if (hasAttachment)
                            const Icon(Icons.close, size: 16, color: Colors.black45),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),

                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      onPressed: () {
                        setState(() {
                          item.status = 'submitted';
                          item.submissionDate = 'Today, ${TimeOfDay.now().format(context)}';
                          item.submissionNotes = notesController.text.trim().isNotEmpty
                              ? notesController.text.trim()
                              : 'Homework submitted on time.';
                        });
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Row(
                              children: [
                                const Icon(Icons.check_circle, color: Colors.white, size: 18),
                                const SizedBox(width: 8),
                                Text('"${item.title}" submitted successfully!'),
                              ],
                            ),
                            backgroundColor: const Color(0xFF059669),
                            behavior: SnackBarBehavior.floating,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: CampusTheme.royalBlue,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        elevation: 0,
                      ),
                      child: const Text('Turn In Assignment', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 14)),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  void _openCreateHomeworkDialog() {
    final titleController = TextEditingController();
    final subjectController = TextEditingController(text: 'Mathematics');
    final classController = TextEditingController(text: 'Class 9-A');
    final descController = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Container(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            top: 20,
            bottom: MediaQuery.of(context).viewInsets.bottom + 20,
          ),
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Assign New Homework',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: CampusTheme.navyDark),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: titleController,
                decoration: InputDecoration(
                  labelText: 'Homework Title',
                  filled: true,
                  fillColor: const Color(0xFFF8FAFC),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: subjectController,
                      decoration: InputDecoration(
                        labelText: 'Subject',
                        filled: true,
                        fillColor: const Color(0xFFF8FAFC),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: TextField(
                      controller: classController,
                      decoration: InputDecoration(
                        labelText: 'Class',
                        filled: true,
                        fillColor: const Color(0xFFF8FAFC),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              TextField(
                controller: descController,
                maxLines: 3,
                decoration: InputDecoration(
                  labelText: 'Description / Instructions',
                  filled: true,
                  fillColor: const Color(0xFFF8FAFC),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 46,
                child: ElevatedButton(
                  onPressed: () {
                    if (titleController.text.trim().isEmpty) return;
                    setState(() {
                      _homeworkList.insert(
                        0,
                        HomeworkItem(
                          id: 'hw-${DateTime.now().millisecondsSinceEpoch}',
                          title: titleController.text.trim(),
                          subject: subjectController.text.trim(),
                          teacher: widget.userProfile?.fullName ?? 'Faculty Member',
                          className: classController.text.trim(),
                          dueDate: 'Due in 3 days',
                          description: descController.text.trim().isNotEmpty
                              ? descController.text.trim()
                              : 'Complete assigned textbook problems.',
                          status: 'pending',
                        ),
                      );
                    });
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('New homework assigned to students!')),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: CampusTheme.royalBlue,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Publish Homework', style: TextStyle(fontWeight: FontWeight.w700)),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final isTeacher = widget.userProfile?.role == UserRole.teacher;

    final filteredList = _homeworkList.filter((item) {
      if (_selectedFilter == 'All') return true;
      if (_selectedFilter == 'Pending') return item.status == 'pending';
      if (_selectedFilter == 'Submitted') return item.status == 'submitted';
      if (_selectedFilter == 'Graded') return item.status == 'graded';
      return true;
    }).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Homework & Assignments',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: CampusTheme.navyDark),
            ),
            Text(
              'Northern Star School & College',
              style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: Colors.blue.shade700),
            ),
          ],
        ),
      ),
      floatingActionButton: isTeacher
          ? FloatingActionButton.extended(
              onPressed: _openCreateHomeworkDialog,
              backgroundColor: CampusTheme.royalBlue,
              icon: const Icon(Icons.add, color: Colors.white),
              label: const Text('Assign Homework', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
            )
          : null,
      body: Column(
        children: [
          // Filter Tabs
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: Colors.white,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: ['All', 'Pending', 'Submitted', 'Graded'].map((filter) {
                  final isSelected = _selectedFilter == filter;
                  int count = 0;
                  if (filter == 'All') {
                    count = _homeworkList.length;
                  } else if (filter == 'Pending') {
                    count = _homeworkList.where((h) => h.status == 'pending').length;
                  } else if (filter == 'Submitted') {
                    count = _homeworkList.where((h) => h.status == 'submitted').length;
                  } else if (filter == 'Graded') {
                    count = _homeworkList.where((h) => h.status == 'graded').length;
                  }

                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: FilterChip(
                      selected: isSelected,
                      label: Text('$filter ($count)'),
                      labelStyle: TextStyle(
                        fontSize: 11,
                        fontWeight: isSelected ? FontWeight.w800 : FontWeight.w600,
                        color: isSelected ? Colors.white : const Color(0xFF475569),
                      ),
                      selectedColor: CampusTheme.royalBlue,
                      backgroundColor: const Color(0xFFF1F5F9),
                      checkmarkColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      onSelected: (val) {
                        setState(() => _selectedFilter = filter);
                      },
                    ),
                  );
                }).toList(),
              ),
            ),
          ),

          const Divider(height: 1, thickness: 1, color: Color(0xFFE2E8F0)),

          // Homework Cards List
          Expanded(
            child: filteredList.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.assignment_turned_in_outlined, size: 48, color: Colors.grey.shade400),
                        const SizedBox(height: 10),
                        Text(
                          'No $_selectedFilter assignments found',
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.grey.shade600),
                        ),
                      ],
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.all(14),
                    itemCount: filteredList.length,
                    itemBuilder: (context, index) {
                      final item = filteredList[index];
                      final subjectColor = _getSubjectColor(item.subject);

                      return Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(color: const Color(0xFFE2E8F0)),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.02),
                              blurRadius: 6,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Header Row: Subject Badge + Status Badge
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: subjectColor.withOpacity(0.12),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Icon(_getSubjectIcon(item.subject), size: 14, color: subjectColor),
                                      const SizedBox(width: 5),
                                      Text(
                                        item.subject,
                                        style: TextStyle(
                                          fontSize: 11,
                                          fontWeight: FontWeight.w800,
                                          color: subjectColor,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                _buildStatusBadge(item.status),
                              ],
                            ),

                            const SizedBox(height: 10),

                            // Title
                            Text(
                              item.title,
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w800,
                                color: CampusTheme.navyDark,
                              ),
                            ),

                            const SizedBox(height: 6),

                            // Description
                            Text(
                              item.description,
                              style: const TextStyle(fontSize: 12, color: Color(0xFF475569), height: 1.35),
                            ),

                            // Attachment if available
                            if (item.attachmentName != null) ...[
                              const SizedBox(height: 10),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFF8FAFC),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: const Color(0xFFE2E8F0)),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    const Icon(Icons.picture_as_pdf, size: 14, color: Colors.redAccent),
                                    const SizedBox(width: 6),
                                    Text(
                                      item.attachmentName!,
                                      style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: Color(0xFF334155)),
                                    ),
                                  ],
                                ),
                              ),
                            ],

                            // Submission notes or feedback if present
                            if (item.status == 'submitted' && item.submissionDate != null) ...[
                              const SizedBox(height: 10),
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFEFF6FF),
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(color: const Color(0xFFBFDBFE)),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        const Icon(Icons.check_circle_outline, size: 14, color: CampusTheme.royalBlue),
                                        const SizedBox(width: 5),
                                        Text(
                                          'Submitted: ${item.submissionDate}',
                                          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: CampusTheme.royalBlue),
                                        ),
                                      ],
                                    ),
                                    if (item.submissionNotes != null) ...[
                                      const SizedBox(height: 3),
                                      Text(
                                        item.submissionNotes!,
                                        style: const TextStyle(fontSize: 11, color: Color(0xFF1E3A8A)),
                                      ),
                                    ],
                                  ],
                                ),
                              ),
                            ],

                            if (item.status == 'graded' && item.score != null) ...[
                              const SizedBox(height: 10),
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFECFDF5),
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(color: const Color(0xFFA7F3D0)),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        const Text(
                                          'Teacher Evaluation',
                                          style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF047857)),
                                        ),
                                        Text(
                                          item.score!,
                                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: Color(0xFF047857)),
                                        ),
                                      ],
                                    ),
                                    if (item.teacherFeedback != null) ...[
                                      const SizedBox(height: 3),
                                      Text(
                                        'Feedback: ${item.teacherFeedback!}',
                                        style: const TextStyle(fontSize: 11, color: Color(0xFF065F46)),
                                      ),
                                    ],
                                  ],
                                ),
                              ),
                            ],

                            const SizedBox(height: 12),
                            const Divider(height: 1, color: Color(0xFFF1F5F9)),
                            const SizedBox(height: 10),

                            // Footer: Teacher, Due Date & Action
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Teacher: ${item.teacher}',
                                      style: const TextStyle(fontSize: 10, color: Color(0xFF64748B)),
                                    ),
                                    Text(
                                      'Due: ${item.dueDate}',
                                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Color(0xFFB91C1C)),
                                    ),
                                  ],
                                ),

                                if (item.status == 'pending')
                                  ElevatedButton.icon(
                                    onPressed: () => _openSubmitDialog(item),
                                    icon: const Icon(Icons.upload, size: 14),
                                    label: const Text('Submit Work', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: CampusTheme.royalBlue,
                                      foregroundColor: Colors.white,
                                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                      elevation: 0,
                                    ),
                                  )
                                else if (item.status == 'submitted')
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFEFF6FF),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: const Text(
                                      'Awaiting Review',
                                      style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: CampusTheme.royalBlue),
                                    ),
                                  )
                                else
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFECFDF5),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: const Text(
                                      'Completed',
                                      style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF059669)),
                                    ),
                                  ),
                              ],
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatusBadge(String status) {
    Color bg;
    Color fg;
    String label;
    IconData icon;

    switch (status) {
      case 'submitted':
        bg = const Color(0xFFDBEAFE);
        fg = const Color(0xFF1D4ED8);
        label = 'Submitted';
        icon = Icons.check_circle;
        break;
      case 'graded':
        bg = const Color(0xFFD1FAE5);
        fg = const Color(0xFF047857);
        label = 'Graded';
        icon = Icons.verified;
        break;
      case 'pending':
      default:
        bg = const Color(0xFFFEF3C7);
        fg = const Color(0xFFB45309);
        label = 'Pending';
        icon = Icons.pending;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: fg),
          const SizedBox(width: 4),
          Text(label, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: fg)),
        ],
      ),
    );
  }
}

extension IterableExtension<E> on Iterable<E> {
  Iterable<E> filter(bool Function(E) test) sync* {
    for (E element in this) {
      if (test(element)) yield element;
    }
  }
}
