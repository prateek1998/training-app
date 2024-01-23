export default class StatusMessage {
  static readonly HTTP_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };

  static readonly SERVER_ERRORS = {
    internal_error: 'Internal Error',
    rate_limit_reached: 'Rate limt exceeded, please try again later some time.',
    missing_field_failed: 'Required Field is missing',
    queryDate: 'Both start date and end date are required',
    queryDateFormat: 'Date should be in YYYY/MM/DD format',
    queryStartDateBetweenEndDate: 'Start date should be less than end date',
    querySort: 'Both sortBy and sort order are required',
    db_error: 'Database connection issues',
    no_information_provided: 'No Information provided to update',
    Unexpected_field: 'Unexpected field',

    // reviews: {
    //   name_not_found: 'Reviewer Name is missing',
    //   name_type: 'Reviewer name type should be string',
    //   name_length: 'Reviewer Name length should be in 3 to 200 characters',
    //   review_not_found: 'Review is missing',
    //   review_type: 'Review type should be string',
    //   rating_not_found: 'Rating is missing',
    //   rating_type: 'Rating type should be number',
    //   rating_limit: 'Rating can be out of 5',
    //   isNegative_not_found: 'isNegative field is missing',
    //   isNegative_type: 'isNegative type should be boolean',
    //   invalid_id: 'Invalid Review Id',
    //   add_failed: 'Failed to add new review',
    //   get_failed: 'Failed to fetch reviews',
    //   update_failed: 'Failed to update the review',
    //   delete_failed: 'Failed to delete the review',
    // },
    depts: {
      name_not_found: 'Dept Name is missing',
      name_type: 'Dept name type should be string',
      head_not_found: 'Dept Head is missing',
      head_type: 'Dept Head Name type should be in proper format',
      add_failed: 'Failed to add new Dept',
      get_failed: 'Failed to fetch Dept',
      update_failed: 'Failed to update the Dept',
      delete_failed: 'Failed to delete the Dept',
      record_not_found: 'Department record not found',
      // name_length: 'Reviewer Name length should be in 3 to 200 characters',
      // review_not_found: 'Review is missing',
      // review_type: 'Review type should be string',
      // rating_not_found: 'Rating is missing',
      // rating_type: 'Rating type should be number',
      // rating_limit: 'Rating can be out of 5',
      // isNegative_not_found: 'isNegative field is missing',
      // isNegative_type: 'isNegative type should be boolean',
      // invalid_id: 'Invalid Review Id',
    },
    loc: {
      name_not_found: 'Location Name is missing',
      name_type: 'Location name type should be string',
      name_length: 'Location Name length should be in 3 to 100 characters',
      add_failed: 'Failed to add new Location',
      get_failed: 'Failed to fetch Location',
      update_failed: 'Failed to update the Location',
      delete_failed: 'Failed to delete the Location',
      record_not_found: 'Location record not found',
    }
  };

  static readonly ERROR_CODES = {
    internal_error_msg: [1001, StatusMessage.SERVER_ERRORS.internal_error, 500],

    depts: {
      information_not_provided_msg: [1051, StatusMessage.SERVER_ERRORS.depts.add_failed, 400],
      name_not_found_msg: [1052, StatusMessage.SERVER_ERRORS.missing_field_failed, 400],
      name_type_msg: [1053, StatusMessage.SERVER_ERRORS.depts.name_type, 400],
      add_db_error_msg: [1054, StatusMessage.SERVER_ERRORS.depts.add_failed, 500],
      get_db_error_msg: [1055, StatusMessage.SERVER_ERRORS.depts.get_failed, 500],
      update_db_error_msg: [1056, StatusMessage.SERVER_ERRORS.depts.update_failed, 500],
      delete_db_error_msg: [1057, StatusMessage.SERVER_ERRORS.depts.delete_failed, 500],
      record_not_found_msg: [1058, StatusMessage.SERVER_ERRORS.depts.get_failed, 500],
      head_not_found_msg: [1059, StatusMessage.SERVER_ERRORS.missing_field_failed, 400],
      head_type_msg: [1060, StatusMessage.SERVER_ERRORS.depts.head_type, 400],
    },
    loc: {
      information_not_provided_msg: [1061, StatusMessage.SERVER_ERRORS.loc.add_failed, 400],
      name_not_found_msg: [1062, StatusMessage.SERVER_ERRORS.missing_field_failed, 400],
      name_type_msg: [1063, StatusMessage.SERVER_ERRORS.loc.name_type, 400],
      name_length_msg: [1064, StatusMessage.SERVER_ERRORS.loc.name_length, 400],
      add_db_error_msg: [1065, StatusMessage.SERVER_ERRORS.loc.add_failed, 500],
      get_db_error_msg: [1066, StatusMessage.SERVER_ERRORS.loc.get_failed, 500],
      update_db_error_msg: [1067, StatusMessage.SERVER_ERRORS.loc.update_failed, 500],
      delete_db_error_msg: [1068, StatusMessage.SERVER_ERRORS.loc.delete_failed, 500],
      record_not_found_msg: [1069, StatusMessage.SERVER_ERRORS.loc.get_failed, 500]
    },

    // reviews: {
    //   review_type_msg: [1006, StatusMessage.SERVER_ERRORS.reviews.review_type, 400],
    //   review_not_found_msg: [1007, StatusMessage.SERVER_ERRORS.reviews.review_not_found, 400],
    //   rating_not_found_msg: [1008, StatusMessage.SERVER_ERRORS.reviews.rating_not_found, 400],
    //   rating_type_msg: [1009, StatusMessage.SERVER_ERRORS.reviews.rating_type, 400],
    //   rating_limit_msg: [1010, StatusMessage.SERVER_ERRORS.reviews.rating_limit, 400],
    //   isNegative_not_found_msg: [1010, StatusMessage.SERVER_ERRORS.reviews.isNegative_not_found, 400],
    //   isNegative_type_msg: [1011, StatusMessage.SERVER_ERRORS.reviews.isNegative_type, 400],
    //   get_db_error_msg: [1013, StatusMessage.SERVER_ERRORS.reviews.get_failed, 500],
    //   update_db_error_msg: [1014, StatusMessage.SERVER_ERRORS.reviews.update_failed, 500],
    //   delete_db_error_msg: [1015, StatusMessage.SERVER_ERRORS.reviews.delete_failed, 500],
    //   get_invalid_id_msg: [1016, StatusMessage.SERVER_ERRORS.reviews.get_failed, 400],
    //   update_invalid_id_msg: [1017, StatusMessage.SERVER_ERRORS.reviews.update_failed, 400],
    //   delete_invalid_id_msg: [1018, StatusMessage.SERVER_ERRORS.reviews.delete_failed, 400],
    // },
  };

  static readonly SERVER_SUCCESS = {
    dept: {
      data_added: 'Dept data saved successfully',
      data_fetched: 'Depts data fetched successfully',
      data_updated: 'Dept data updated successfully',
      data_deleted: 'Dept data delete successfully',
    },
    loc: {
      data_added: 'Location data saved successfully',
      data_fetched: 'Locations data fetched successfully',
      data_updated: 'Location data updated successfully',
      data_deleted: 'Location data delete successfully',
    },
  };

  static readonly DB_ERRORS = {
    uniqueConstantError: 'MongoDBUniqueConstraintError',
    validationError: 'MongoDBValidationError',
    accessDeniedError: 'MongoDBAccessDeniedError',
    MongoDBConnectionError: 'MongoDBConnectionError',
    MongoDBDuplicateError: 'MongoServerError',
    MongoDBCastError: 'CastError',
  };

  static readonly DB_LOGS = {
    DB_CONNECTED_SYNC_SUCCESS_MSG: '####### Database connected and synced successfully #######',
    DB_NOT_CONNECTED_MSG: '####### Database not connected successfully #######',
  };

  constructor() {}
}
