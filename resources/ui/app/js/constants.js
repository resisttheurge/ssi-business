angular.module('constants', [])
.constant(
  "enums",
  {
    "jobStatuses"         : ["INACTIVE", "ACTIVE", "COMPLETED", "CANCELLED", "DELETED"],
    "prefixes"            : ['B', 'F', 'FC', 'FE', 'FR', 'FS', 'M', 'MF', 'MT', 'RG', 'BM', 'LM', 'MM', 'D', 'G', 'DR', 'EE', 'ME', 'MS', 'TM'],
    "drawingTypes"        : ["DETAIL", "LAYOUT", "VOID"],
    "shippingItemStatus"  : ["FAB", "FTS", "HOLD", "MACH", "MEM", "MOO", "NEXT", "NS", "PAINT", "PREFAB", "REWORK", "RTA", "RTP", "RTS", "SAMPLE", "SHPD", "SIP", "VOID", "`W.O.REV.`", "WP"]
  })
