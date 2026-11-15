class AppModuleModel {
  final String moduleKey;
  final String name;
  final String description;
  final String icon;
  final bool isEnabled;
  final List<String> allowedRoles;
  final int displayOrder;

  AppModuleModel({
    required this.moduleKey,
    required this.name,
    required this.description,
    required this.icon,
    required this.isEnabled,
    required this.allowedRoles,
    required this.displayOrder,
  });

  factory AppModuleModel.fromJson(Map<String, dynamic> json) {
    return AppModuleModel(
      moduleKey: json['module_key'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      icon: json['icon'] ?? '',
      isEnabled: json['is_enabled'] ?? true,
      allowedRoles: (json['allowed_roles'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      displayOrder: json['display_order'] ?? 0,
    );
  }
}
