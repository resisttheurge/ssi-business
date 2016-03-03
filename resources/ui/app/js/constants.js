angular.module('constants', [])
.constant(
  "enums",
  {
    "jobStatuses" : ["INACTIVE", "ACTIVE", "COMPLETED", "CANCELLED", "DELETED"],
    "prefixes"    : ['B', 'F', 'FC', 'FE', 'FR', 'FS', 'M', 'MF', 'MT', 'RG', 'BM', 'LM', 'MM', 'D', 'G', 'DR', 'EE', 'ME', 'MS', 'TM'],
    "drawingTypes": ["DETAIL", "LAYOUT", "VOID"]
  })
