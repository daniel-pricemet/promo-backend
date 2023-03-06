export enum GrantsEnum {
  ADMIN = 'admin',

  // View grants
  VIEW_PARAMETER = 'view_parameter',
  VIEW_META = 'view_meta',
  VIEW_CAMPAIGN = 'view_campaign',
  VIEW_TEMPLATE = 'view_template',
  VIEW_POSTER = 'view_poster',
  VIEW_TAG = 'view_tag',

  // Create grants
  CREATE_PARAMETER = 'create_parameter',
  CREATE_META = 'create_meta',
  CREATE_CAMPAIGN = 'create_campaign',
  CREATE_TEMPLATE = 'create_template',
  CREATE_POSTER = 'create_poster',
  CREATE_TAG = 'create_tag',

  // Edit grants
  EDIT_PARAMETER = 'edit_parameter',
  EDIT_META = 'edit_meta',
  EDIT_CAMPAIGN = 'edit_campaign',
  EDIT_TEMPLATE = 'edit_template',
  EDIT_POSTER = 'edit_poster',
  EDIT_TAG = 'edit_tag',

  // Delete grants
  DELETE_PARAMETER = 'delete_parameter',
  DELETE_META = 'delete_meta',
  DELETE_CAMPAIGN = 'delete_campaign',
  DELETE_TEMPLATE = 'delete_template',
  DELETE_POSTER = 'delete_poster',
  DELETE_TAG = 'delete_tag',
}

export enum PoliciesEnum {
  SESSION_EXPIRATION = 120,
}
