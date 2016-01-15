package slick.schema
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.driver.MySQLDriver
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.driver.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Array(Addenda.schema, Addresses.schema, Carriers.schema, Contacts.schema, Customers.schema, Drawings.schema, Files.schema, JobAddresses.schema, Jobs.schema, Manufacturers.schema, Marks.schema, PartOrders.schema, Parts.schema, Salespeople.schema, Schedules.schema, ShipmentItems.schema, Shipments.schema, ShippingGroupItems.schema, ShippingGroups.schema, ShippingItems.schema, ShippingItemZones.schema, ShippingRequests.schema, Shops.schema, SpecialtyItems.schema, UserRoles.schema, Users.schema, UserTokens.schema, Vendors.schema, Zones.schema).reduceLeft(_ ++ _)
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Addenda
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param jobId Database column job_id SqlType(INT UNSIGNED)
   *  @param label Database column label SqlType(VARCHAR), Length(50,true)
   *  @param description Database column description SqlType(TEXT)
   *  @param created Database column created SqlType(TIMESTAMP) */
  case class AddendaRow(id: Int, jobId: Int, label: String, description: String, created: java.sql.Timestamp)
  /** GetResult implicit for fetching AddendaRow objects using plain SQL queries */
  implicit def GetResultAddendaRow(implicit e0: GR[Int], e1: GR[String], e2: GR[java.sql.Timestamp]): GR[AddendaRow] = GR{
    prs => import prs._
    AddendaRow.tupled((<<[Int], <<[Int], <<[String], <<[String], <<[java.sql.Timestamp]))
  }
  /** Table description of table addenda. Objects of this class serve as prototypes for rows in queries. */
  class Addenda(_tableTag: Tag) extends Table[AddendaRow](_tableTag, "addenda") {
    def * = (id, jobId, label, description, created) <> (AddendaRow.tupled, AddendaRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(jobId), Rep.Some(label), Rep.Some(description), Rep.Some(created)).shaped.<>({r=>import r._; _1.map(_=> AddendaRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column job_id SqlType(INT UNSIGNED) */
    val jobId: Rep[Int] = column[Int]("job_id")
    /** Database column label SqlType(VARCHAR), Length(50,true) */
    val label: Rep[String] = column[String]("label", O.Length(50,varying=true))
    /** Database column description SqlType(TEXT) */
    val description: Rep[String] = column[String]("description")
    /** Database column created SqlType(TIMESTAMP) */
    val created: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("created")

    /** Foreign key referencing Jobs (database name addenda__jobs__fk) */
    lazy val jobsFk = foreignKey("addenda__jobs__fk", jobId, Jobs)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (jobId,label) (database name UNIQUE_REVISION_LABEL) */
    val index1 = index("UNIQUE_REVISION_LABEL", (jobId, label), unique=true)
  }
  /** Collection-like TableQuery object for table Addenda */
  lazy val Addenda = new TableQuery(tag => new Addenda(tag))

  /** Entity class storing rows of table Addresses
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param lines Database column lines SqlType(TEXT), Default(None)
   *  @param city Database column city SqlType(VARCHAR), Length(100,true), Default(None)
   *  @param stateOrProvince Database column state_or_province SqlType(VARCHAR), Length(100,true), Default(None)
   *  @param postalCode Database column postal_code SqlType(VARCHAR), Length(20,true), Default(None)
   *  @param country Database column country SqlType(VARCHAR), Length(100,true), Default(None) */
  case class AddressesRow(id: Int, lines: Option[String] = None, city: Option[String] = None, stateOrProvince: Option[String] = None, postalCode: Option[String] = None, country: Option[String] = None)
  /** GetResult implicit for fetching AddressesRow objects using plain SQL queries */
  implicit def GetResultAddressesRow(implicit e0: GR[Int], e1: GR[Option[String]]): GR[AddressesRow] = GR{
    prs => import prs._
    AddressesRow.tupled((<<[Int], <<?[String], <<?[String], <<?[String], <<?[String], <<?[String]))
  }
  /** Table description of table addresses. Objects of this class serve as prototypes for rows in queries. */
  class Addresses(_tableTag: Tag) extends Table[AddressesRow](_tableTag, "addresses") {
    def * = (id, lines, city, stateOrProvince, postalCode, country) <> (AddressesRow.tupled, AddressesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), lines, city, stateOrProvince, postalCode, country).shaped.<>({r=>import r._; _1.map(_=> AddressesRow.tupled((_1.get, _2, _3, _4, _5, _6)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column lines SqlType(TEXT), Default(None) */
    val lines: Rep[Option[String]] = column[Option[String]]("lines", O.Default(None))
    /** Database column city SqlType(VARCHAR), Length(100,true), Default(None) */
    val city: Rep[Option[String]] = column[Option[String]]("city", O.Length(100,varying=true), O.Default(None))
    /** Database column state_or_province SqlType(VARCHAR), Length(100,true), Default(None) */
    val stateOrProvince: Rep[Option[String]] = column[Option[String]]("state_or_province", O.Length(100,varying=true), O.Default(None))
    /** Database column postal_code SqlType(VARCHAR), Length(20,true), Default(None) */
    val postalCode: Rep[Option[String]] = column[Option[String]]("postal_code", O.Length(20,varying=true), O.Default(None))
    /** Database column country SqlType(VARCHAR), Length(100,true), Default(None) */
    val country: Rep[Option[String]] = column[Option[String]]("country", O.Length(100,varying=true), O.Default(None))
  }
  /** Collection-like TableQuery object for table Addresses */
  lazy val Addresses = new TableQuery(tag => new Addresses(tag))

  /** Entity class storing rows of table Carriers
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param label Database column label SqlType(VARCHAR), Length(100,true) */
  case class CarriersRow(id: Int, label: String)
  /** GetResult implicit for fetching CarriersRow objects using plain SQL queries */
  implicit def GetResultCarriersRow(implicit e0: GR[Int], e1: GR[String]): GR[CarriersRow] = GR{
    prs => import prs._
    CarriersRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table carriers. Objects of this class serve as prototypes for rows in queries. */
  class Carriers(_tableTag: Tag) extends Table[CarriersRow](_tableTag, "carriers") {
    def * = (id, label) <> (CarriersRow.tupled, CarriersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(label)).shaped.<>({r=>import r._; _1.map(_=> CarriersRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))

    /** Uniqueness Index over (label) (database name label_UNIQUE) */
    val index1 = index("label_UNIQUE", label, unique=true)
  }
  /** Collection-like TableQuery object for table Carriers */
  lazy val Carriers = new TableQuery(tag => new Carriers(tag))

  /** Entity class storing rows of table Contacts
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param label Database column label SqlType(VARCHAR), Length(100,true)
   *  @param phone Database column phone SqlType(VARCHAR), Length(20,true), Default(None)
   *  @param fax Database column fax SqlType(VARCHAR), Length(20,true), Default(None)
   *  @param email Database column email SqlType(VARCHAR), Length(100,true), Default(None) */
  case class ContactsRow(id: Int, label: String, phone: Option[String] = None, fax: Option[String] = None, email: Option[String] = None)
  /** GetResult implicit for fetching ContactsRow objects using plain SQL queries */
  implicit def GetResultContactsRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[String]]): GR[ContactsRow] = GR{
    prs => import prs._
    ContactsRow.tupled((<<[Int], <<[String], <<?[String], <<?[String], <<?[String]))
  }
  /** Table description of table contacts. Objects of this class serve as prototypes for rows in queries. */
  class Contacts(_tableTag: Tag) extends Table[ContactsRow](_tableTag, "contacts") {
    def * = (id, label, phone, fax, email) <> (ContactsRow.tupled, ContactsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(label), phone, fax, email).shaped.<>({r=>import r._; _1.map(_=> ContactsRow.tupled((_1.get, _2.get, _3, _4, _5)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))
    /** Database column phone SqlType(VARCHAR), Length(20,true), Default(None) */
    val phone: Rep[Option[String]] = column[Option[String]]("phone", O.Length(20,varying=true), O.Default(None))
    /** Database column fax SqlType(VARCHAR), Length(20,true), Default(None) */
    val fax: Rep[Option[String]] = column[Option[String]]("fax", O.Length(20,varying=true), O.Default(None))
    /** Database column email SqlType(VARCHAR), Length(100,true), Default(None) */
    val email: Rep[Option[String]] = column[Option[String]]("email", O.Length(100,varying=true), O.Default(None))

    /** Uniqueness Index over (label) (database name label_UNIQUE) */
    val index1 = index("label_UNIQUE", label, unique=true)
  }
  /** Collection-like TableQuery object for table Contacts */
  lazy val Contacts = new TableQuery(tag => new Contacts(tag))

  /** Entity class storing rows of table Customers
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param label Database column label SqlType(VARCHAR), Length(100,true) */
  case class CustomersRow(id: Int, label: String)
  /** GetResult implicit for fetching CustomersRow objects using plain SQL queries */
  implicit def GetResultCustomersRow(implicit e0: GR[Int], e1: GR[String]): GR[CustomersRow] = GR{
    prs => import prs._
    CustomersRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table customers. Objects of this class serve as prototypes for rows in queries. */
  class Customers(_tableTag: Tag) extends Table[CustomersRow](_tableTag, "customers") {
    def * = (id, label) <> (CustomersRow.tupled, CustomersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(label)).shaped.<>({r=>import r._; _1.map(_=> CustomersRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))

    /** Uniqueness Index over (label) (database name label_UNIQUE) */
    val index1 = index("label_UNIQUE", label, unique=true)
  }
  /** Collection-like TableQuery object for table Customers */
  lazy val Customers = new TableQuery(tag => new Customers(tag))

  /** Entity class storing rows of table Drawings
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param jobId Database column job_id SqlType(INT UNSIGNED)
   *  @param label Database column label SqlType(VARCHAR), Length(100,true)
   *  @param drawingType Database column drawing_type SqlType(ENUM), Length(7,false)
   *  @param specialtyItemId Database column specialty_item_id SqlType(INT UNSIGNED), Default(None)
   *  @param shippingRequestId Database column shipping_request_id SqlType(INT UNSIGNED), Default(None) */
  case class DrawingsRow(id: Int, jobId: Int, label: String, drawingType: String, specialtyItemId: Option[Int] = None, shippingRequestId: Option[Int] = None)
  /** GetResult implicit for fetching DrawingsRow objects using plain SQL queries */
  implicit def GetResultDrawingsRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[Int]]): GR[DrawingsRow] = GR{
    prs => import prs._
    DrawingsRow.tupled((<<[Int], <<[Int], <<[String], <<[String], <<?[Int], <<?[Int]))
  }
  /** Table description of table drawings. Objects of this class serve as prototypes for rows in queries. */
  class Drawings(_tableTag: Tag) extends Table[DrawingsRow](_tableTag, "drawings") {
    def * = (id, jobId, label, drawingType, specialtyItemId, shippingRequestId) <> (DrawingsRow.tupled, DrawingsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(jobId), Rep.Some(label), Rep.Some(drawingType), specialtyItemId, shippingRequestId).shaped.<>({r=>import r._; _1.map(_=> DrawingsRow.tupled((_1.get, _2.get, _3.get, _4.get, _5, _6)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column job_id SqlType(INT UNSIGNED) */
    val jobId: Rep[Int] = column[Int]("job_id")
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))
    /** Database column drawing_type SqlType(ENUM), Length(7,false) */
    val drawingType: Rep[String] = column[String]("drawing_type", O.Length(7,varying=false))
    /** Database column specialty_item_id SqlType(INT UNSIGNED), Default(None) */
    val specialtyItemId: Rep[Option[Int]] = column[Option[Int]]("specialty_item_id", O.Default(None))
    /** Database column shipping_request_id SqlType(INT UNSIGNED), Default(None) */
    val shippingRequestId: Rep[Option[Int]] = column[Option[Int]]("shipping_request_id", O.Default(None))

    /** Foreign key referencing Jobs (database name drawings__jobs__fk) */
    lazy val jobsFk = foreignKey("drawings__jobs__fk", jobId, Jobs)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing ShippingRequests (database name drawings__shipping_requests__fk) */
    lazy val shippingRequestsFk = foreignKey("drawings__shipping_requests__fk", shippingRequestId, ShippingRequests)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing SpecialtyItems (database name drawings__specialty_items__fk) */
    lazy val specialtyItemsFk = foreignKey("drawings__specialty_items__fk", specialtyItemId, SpecialtyItems)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (jobId,label) (database name UNIQUE_JOB_DRAWING_LABEL) */
    val index1 = index("UNIQUE_JOB_DRAWING_LABEL", (jobId, label), unique=true)
  }
  /** Collection-like TableQuery object for table Drawings */
  lazy val Drawings = new TableQuery(tag => new Drawings(tag))

  /** Entity class storing rows of table Files
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param path Database column path SqlType(VARCHAR), Length(200,true) */
  case class FilesRow(id: Int, path: String)
  /** GetResult implicit for fetching FilesRow objects using plain SQL queries */
  implicit def GetResultFilesRow(implicit e0: GR[Int], e1: GR[String]): GR[FilesRow] = GR{
    prs => import prs._
    FilesRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table files. Objects of this class serve as prototypes for rows in queries. */
  class Files(_tableTag: Tag) extends Table[FilesRow](_tableTag, "files") {
    def * = (id, path) <> (FilesRow.tupled, FilesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(path)).shaped.<>({r=>import r._; _1.map(_=> FilesRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column path SqlType(VARCHAR), Length(200,true) */
    val path: Rep[String] = column[String]("path", O.Length(200,varying=true))

    /** Uniqueness Index over (path) (database name path_UNIQUE) */
    val index1 = index("path_UNIQUE", path, unique=true)
  }
  /** Collection-like TableQuery object for table Files */
  lazy val Files = new TableQuery(tag => new Files(tag))

  /** Entity class storing rows of table JobAddresses
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param jobId Database column job_id SqlType(INT UNSIGNED)
   *  @param addressType Database column address_type SqlType(ENUM), Length(9,false)
   *  @param addressId Database column address_id SqlType(INT UNSIGNED) */
  case class JobAddressesRow(id: Int, jobId: Int, addressType: String, addressId: Int)
  /** GetResult implicit for fetching JobAddressesRow objects using plain SQL queries */
  implicit def GetResultJobAddressesRow(implicit e0: GR[Int], e1: GR[String]): GR[JobAddressesRow] = GR{
    prs => import prs._
    JobAddressesRow.tupled((<<[Int], <<[Int], <<[String], <<[Int]))
  }
  /** Table description of table job_addresses. Objects of this class serve as prototypes for rows in queries. */
  class JobAddresses(_tableTag: Tag) extends Table[JobAddressesRow](_tableTag, "job_addresses") {
    def * = (id, jobId, addressType, addressId) <> (JobAddressesRow.tupled, JobAddressesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(jobId), Rep.Some(addressType), Rep.Some(addressId)).shaped.<>({r=>import r._; _1.map(_=> JobAddressesRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column job_id SqlType(INT UNSIGNED) */
    val jobId: Rep[Int] = column[Int]("job_id")
    /** Database column address_type SqlType(ENUM), Length(9,false) */
    val addressType: Rep[String] = column[String]("address_type", O.Length(9,varying=false))
    /** Database column address_id SqlType(INT UNSIGNED) */
    val addressId: Rep[Int] = column[Int]("address_id")

    /** Foreign key referencing Addresses (database name job_addresses__addresses__fk) */
    lazy val addressesFk = foreignKey("job_addresses__addresses__fk", addressId, Addresses)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Jobs (database name job_addresses__jobs__fk) */
    lazy val jobsFk = foreignKey("job_addresses__jobs__fk", jobId, Jobs)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (jobId,addressType) (database name UNIQUE_JOB_ADDRESS_TYPE) */
    val index1 = index("UNIQUE_JOB_ADDRESS_TYPE", (jobId, addressType), unique=true)
  }
  /** Collection-like TableQuery object for table JobAddresses */
  lazy val JobAddresses = new TableQuery(tag => new JobAddresses(tag))

  /** Entity class storing rows of table Jobs
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param prefix Database column prefix SqlType(ENUM), Length(2,false)
   *  @param year Database column year SqlType(YEAR)
   *  @param label Database column label SqlType(VARCHAR), Length(20,true)
   *  @param status Database column status SqlType(ENUM), Length(9,false), Default(DRAFT)
   *  @param description Database column description SqlType(TEXT), Default(None)
   *  @param contractPrice Database column contract_price SqlType(DECIMAL), Default(None)
   *  @param startDate Database column start_date SqlType(DATE), Default(None)
   *  @param dueDate Database column due_date SqlType(DATE), Default(None)
   *  @param completeDate Database column complete_date SqlType(DATE), Default(None)
   *  @param shopId Database column shop_id SqlType(INT UNSIGNED), Default(None)
   *  @param salespersonId Database column salesperson_id SqlType(INT UNSIGNED), Default(None)
   *  @param customerId Database column customer_id SqlType(INT UNSIGNED), Default(None)
   *  @param contactId Database column contact_id SqlType(INT UNSIGNED), Default(None) */
  case class JobsRow(id: Int, prefix: String, year: java.sql.Date, label: String, status: String = "DRAFT", description: Option[String] = None, contractPrice: Option[scala.math.BigDecimal] = None, startDate: Option[java.sql.Date] = None, dueDate: Option[java.sql.Date] = None, completeDate: Option[java.sql.Date] = None, shopId: Option[Int] = None, salespersonId: Option[Int] = None, customerId: Option[Int] = None, contactId: Option[Int] = None)
  /** GetResult implicit for fetching JobsRow objects using plain SQL queries */
  implicit def GetResultJobsRow(implicit e0: GR[Int], e1: GR[String], e2: GR[java.sql.Date], e3: GR[Option[String]], e4: GR[Option[scala.math.BigDecimal]], e5: GR[Option[java.sql.Date]], e6: GR[Option[Int]]): GR[JobsRow] = GR{
    prs => import prs._
    JobsRow.tupled((<<[Int], <<[String], <<[java.sql.Date], <<[String], <<[String], <<?[String], <<?[scala.math.BigDecimal], <<?[java.sql.Date], <<?[java.sql.Date], <<?[java.sql.Date], <<?[Int], <<?[Int], <<?[Int], <<?[Int]))
  }
  /** Table description of table jobs. Objects of this class serve as prototypes for rows in queries. */
  class Jobs(_tableTag: Tag) extends Table[JobsRow](_tableTag, "jobs") {
    def * = (id, prefix, year, label, status, description, contractPrice, startDate, dueDate, completeDate, shopId, salespersonId, customerId, contactId) <> (JobsRow.tupled, JobsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(prefix), Rep.Some(year), Rep.Some(label), Rep.Some(status), description, contractPrice, startDate, dueDate, completeDate, shopId, salespersonId, customerId, contactId).shaped.<>({r=>import r._; _1.map(_=> JobsRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6, _7, _8, _9, _10, _11, _12, _13, _14)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column prefix SqlType(ENUM), Length(2,false) */
    val prefix: Rep[String] = column[String]("prefix", O.Length(2,varying=false))
    /** Database column year SqlType(YEAR) */
    val year: Rep[java.sql.Date] = column[java.sql.Date]("year")
    /** Database column label SqlType(VARCHAR), Length(20,true) */
    val label: Rep[String] = column[String]("label", O.Length(20,varying=true))
    /** Database column status SqlType(ENUM), Length(9,false), Default(DRAFT) */
    val status: Rep[String] = column[String]("status", O.Length(9,varying=false), O.Default("DRAFT"))
    /** Database column description SqlType(TEXT), Default(None) */
    val description: Rep[Option[String]] = column[Option[String]]("description", O.Default(None))
    /** Database column contract_price SqlType(DECIMAL), Default(None) */
    val contractPrice: Rep[Option[scala.math.BigDecimal]] = column[Option[scala.math.BigDecimal]]("contract_price", O.Default(None))
    /** Database column start_date SqlType(DATE), Default(None) */
    val startDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("start_date", O.Default(None))
    /** Database column due_date SqlType(DATE), Default(None) */
    val dueDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("due_date", O.Default(None))
    /** Database column complete_date SqlType(DATE), Default(None) */
    val completeDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("complete_date", O.Default(None))
    /** Database column shop_id SqlType(INT UNSIGNED), Default(None) */
    val shopId: Rep[Option[Int]] = column[Option[Int]]("shop_id", O.Default(None))
    /** Database column salesperson_id SqlType(INT UNSIGNED), Default(None) */
    val salespersonId: Rep[Option[Int]] = column[Option[Int]]("salesperson_id", O.Default(None))
    /** Database column customer_id SqlType(INT UNSIGNED), Default(None) */
    val customerId: Rep[Option[Int]] = column[Option[Int]]("customer_id", O.Default(None))
    /** Database column contact_id SqlType(INT UNSIGNED), Default(None) */
    val contactId: Rep[Option[Int]] = column[Option[Int]]("contact_id", O.Default(None))

    /** Foreign key referencing Contacts (database name jobs__contacts__fk) */
    lazy val contactsFk = foreignKey("jobs__contacts__fk", contactId, Contacts)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Customers (database name jobs__customers__fk) */
    lazy val customersFk = foreignKey("jobs__customers__fk", customerId, Customers)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Salespeople (database name jobs__salespeople__fk) */
    lazy val salespeopleFk = foreignKey("jobs__salespeople__fk", salespersonId, Salespeople)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Shops (database name jobs__shops__fk) */
    lazy val shopsFk = foreignKey("jobs__shops__fk", shopId, Shops)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (year,label,prefix) (database name UNIQUE_JOB_NUMBER_AND_REVISION) */
    val index1 = index("UNIQUE_JOB_NUMBER_AND_REVISION", (year, label, prefix), unique=true)
  }
  /** Collection-like TableQuery object for table Jobs */
  lazy val Jobs = new TableQuery(tag => new Jobs(tag))

  /** Entity class storing rows of table Manufacturers
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param label Database column label SqlType(VARCHAR), Length(100,true) */
  case class ManufacturersRow(id: Int, label: String)
  /** GetResult implicit for fetching ManufacturersRow objects using plain SQL queries */
  implicit def GetResultManufacturersRow(implicit e0: GR[Int], e1: GR[String]): GR[ManufacturersRow] = GR{
    prs => import prs._
    ManufacturersRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table manufacturers. Objects of this class serve as prototypes for rows in queries. */
  class Manufacturers(_tableTag: Tag) extends Table[ManufacturersRow](_tableTag, "manufacturers") {
    def * = (id, label) <> (ManufacturersRow.tupled, ManufacturersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(label)).shaped.<>({r=>import r._; _1.map(_=> ManufacturersRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))

    /** Uniqueness Index over (label) (database name label_UNIQUE) */
    val index1 = index("label_UNIQUE", label, unique=true)
  }
  /** Collection-like TableQuery object for table Manufacturers */
  lazy val Manufacturers = new TableQuery(tag => new Manufacturers(tag))

  /** Entity class storing rows of table Marks
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param drawingId Database column drawing_id SqlType(INT UNSIGNED)
   *  @param label Database column label SqlType(VARCHAR), Length(100,true)
   *  @param tagType Database column tag_type SqlType(ENUM), Length(2,false), Default(None)
   *  @param shippingItemId Database column shipping_item_id SqlType(INT UNSIGNED), Default(None) */
  case class MarksRow(id: Int, drawingId: Int, label: String, tagType: Option[String] = None, shippingItemId: Option[Int] = None)
  /** GetResult implicit for fetching MarksRow objects using plain SQL queries */
  implicit def GetResultMarksRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[String]], e3: GR[Option[Int]]): GR[MarksRow] = GR{
    prs => import prs._
    MarksRow.tupled((<<[Int], <<[Int], <<[String], <<?[String], <<?[Int]))
  }
  /** Table description of table marks. Objects of this class serve as prototypes for rows in queries. */
  class Marks(_tableTag: Tag) extends Table[MarksRow](_tableTag, "marks") {
    def * = (id, drawingId, label, tagType, shippingItemId) <> (MarksRow.tupled, MarksRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(drawingId), Rep.Some(label), tagType, shippingItemId).shaped.<>({r=>import r._; _1.map(_=> MarksRow.tupled((_1.get, _2.get, _3.get, _4, _5)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column drawing_id SqlType(INT UNSIGNED) */
    val drawingId: Rep[Int] = column[Int]("drawing_id")
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))
    /** Database column tag_type SqlType(ENUM), Length(2,false), Default(None) */
    val tagType: Rep[Option[String]] = column[Option[String]]("tag_type", O.Length(2,varying=false), O.Default(None))
    /** Database column shipping_item_id SqlType(INT UNSIGNED), Default(None) */
    val shippingItemId: Rep[Option[Int]] = column[Option[Int]]("shipping_item_id", O.Default(None))

    /** Foreign key referencing Drawings (database name marks__drawings__fk) */
    lazy val drawingsFk = foreignKey("marks__drawings__fk", drawingId, Drawings)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing ShippingItems (database name marks__shipping_items__fk) */
    lazy val shippingItemsFk = foreignKey("marks__shipping_items__fk", shippingItemId, ShippingItems)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (drawingId,label) (database name UNIQUE_DRAWING_MARK) */
    val index1 = index("UNIQUE_DRAWING_MARK", (drawingId, label), unique=true)
  }
  /** Collection-like TableQuery object for table Marks */
  lazy val Marks = new TableQuery(tag => new Marks(tag))

  /** Entity class storing rows of table PartOrders
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param jobId Database column job_id SqlType(INT UNSIGNED)
   *  @param drawingId Database column drawing_id SqlType(INT UNSIGNED), Default(None)
   *  @param status Database column status SqlType(ENUM), Length(9,false)
   *  @param partId Database column part_id SqlType(INT UNSIGNED), Default(None)
   *  @param manufacturerId Database column manufacturer_id SqlType(INT UNSIGNED), Default(None)
   *  @param vendorId Database column vendor_id SqlType(INT UNSIGNED), Default(None)
   *  @param po Database column po SqlType(VARCHAR), Length(100,true), Default(None)
   *  @param requestedQuantity Database column requested_quantity SqlType(INT UNSIGNED), Default(0)
   *  @param stockQuantity Database column stock_quantity SqlType(INT UNSIGNED), Default(0)
   *  @param purchaseQuantity Database column purchase_quantity SqlType(INT UNSIGNED), Default(0)
   *  @param requestDate Database column request_date SqlType(DATE), Default(None)
   *  @param purchaseDate Database column purchase_date SqlType(DATE), Default(None)
   *  @param releaseDate Database column release_date SqlType(DATE), Default(None)
   *  @param releasedBy Database column released_by SqlType(VARCHAR), Length(100,true), Default(None) */
  case class PartOrdersRow(id: Int, jobId: Int, drawingId: Option[Int] = None, status: String, partId: Option[Int] = None, manufacturerId: Option[Int] = None, vendorId: Option[Int] = None, po: Option[String] = None, requestedQuantity: Int = 0, stockQuantity: Int = 0, purchaseQuantity: Int = 0, requestDate: Option[java.sql.Date] = None, purchaseDate: Option[java.sql.Date] = None, releaseDate: Option[java.sql.Date] = None, releasedBy: Option[String] = None)
  /** GetResult implicit for fetching PartOrdersRow objects using plain SQL queries */
  implicit def GetResultPartOrdersRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[String], e3: GR[Option[String]], e4: GR[Option[java.sql.Date]]): GR[PartOrdersRow] = GR{
    prs => import prs._
    PartOrdersRow.tupled((<<[Int], <<[Int], <<?[Int], <<[String], <<?[Int], <<?[Int], <<?[Int], <<?[String], <<[Int], <<[Int], <<[Int], <<?[java.sql.Date], <<?[java.sql.Date], <<?[java.sql.Date], <<?[String]))
  }
  /** Table description of table part_orders. Objects of this class serve as prototypes for rows in queries. */
  class PartOrders(_tableTag: Tag) extends Table[PartOrdersRow](_tableTag, "part_orders") {
    def * = (id, jobId, drawingId, status, partId, manufacturerId, vendorId, po, requestedQuantity, stockQuantity, purchaseQuantity, requestDate, purchaseDate, releaseDate, releasedBy) <> (PartOrdersRow.tupled, PartOrdersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(jobId), drawingId, Rep.Some(status), partId, manufacturerId, vendorId, po, Rep.Some(requestedQuantity), Rep.Some(stockQuantity), Rep.Some(purchaseQuantity), requestDate, purchaseDate, releaseDate, releasedBy).shaped.<>({r=>import r._; _1.map(_=> PartOrdersRow.tupled((_1.get, _2.get, _3, _4.get, _5, _6, _7, _8, _9.get, _10.get, _11.get, _12, _13, _14, _15)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column job_id SqlType(INT UNSIGNED) */
    val jobId: Rep[Int] = column[Int]("job_id")
    /** Database column drawing_id SqlType(INT UNSIGNED), Default(None) */
    val drawingId: Rep[Option[Int]] = column[Option[Int]]("drawing_id", O.Default(None))
    /** Database column status SqlType(ENUM), Length(9,false) */
    val status: Rep[String] = column[String]("status", O.Length(9,varying=false))
    /** Database column part_id SqlType(INT UNSIGNED), Default(None) */
    val partId: Rep[Option[Int]] = column[Option[Int]]("part_id", O.Default(None))
    /** Database column manufacturer_id SqlType(INT UNSIGNED), Default(None) */
    val manufacturerId: Rep[Option[Int]] = column[Option[Int]]("manufacturer_id", O.Default(None))
    /** Database column vendor_id SqlType(INT UNSIGNED), Default(None) */
    val vendorId: Rep[Option[Int]] = column[Option[Int]]("vendor_id", O.Default(None))
    /** Database column po SqlType(VARCHAR), Length(100,true), Default(None) */
    val po: Rep[Option[String]] = column[Option[String]]("po", O.Length(100,varying=true), O.Default(None))
    /** Database column requested_quantity SqlType(INT UNSIGNED), Default(0) */
    val requestedQuantity: Rep[Int] = column[Int]("requested_quantity", O.Default(0))
    /** Database column stock_quantity SqlType(INT UNSIGNED), Default(0) */
    val stockQuantity: Rep[Int] = column[Int]("stock_quantity", O.Default(0))
    /** Database column purchase_quantity SqlType(INT UNSIGNED), Default(0) */
    val purchaseQuantity: Rep[Int] = column[Int]("purchase_quantity", O.Default(0))
    /** Database column request_date SqlType(DATE), Default(None) */
    val requestDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("request_date", O.Default(None))
    /** Database column purchase_date SqlType(DATE), Default(None) */
    val purchaseDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("purchase_date", O.Default(None))
    /** Database column release_date SqlType(DATE), Default(None) */
    val releaseDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("release_date", O.Default(None))
    /** Database column released_by SqlType(VARCHAR), Length(100,true), Default(None) */
    val releasedBy: Rep[Option[String]] = column[Option[String]]("released_by", O.Length(100,varying=true), O.Default(None))

    /** Foreign key referencing Drawings (database name purchase_orders__drawings__fk) */
    lazy val drawingsFk = foreignKey("purchase_orders__drawings__fk", drawingId, Drawings)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Jobs (database name purchase_orders__jobs__fk) */
    lazy val jobsFk = foreignKey("purchase_orders__jobs__fk", jobId, Jobs)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Manufacturers (database name purchase_orders__manufacturers__fk) */
    lazy val manufacturersFk = foreignKey("purchase_orders__manufacturers__fk", manufacturerId, Manufacturers)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Parts (database name purchase_orders__parts__fk) */
    lazy val partsFk = foreignKey("purchase_orders__parts__fk", partId, Parts)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Vendors (database name purchase_orders__vendors__fk) */
    lazy val vendorsFk = foreignKey("purchase_orders__vendors__fk", vendorId, Vendors)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table PartOrders */
  lazy val PartOrders = new TableQuery(tag => new PartOrders(tag))

  /** Entity class storing rows of table Parts
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param `type` Database column type SqlType(ENUM), Length(5,false)
   *  @param number Database column number SqlType(VARCHAR), Length(200,true)
   *  @param description Database column description SqlType(TEXT), Default(None) */
  case class PartsRow(id: Int, `type`: String, number: String, description: Option[String] = None)
  /** GetResult implicit for fetching PartsRow objects using plain SQL queries */
  implicit def GetResultPartsRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[String]]): GR[PartsRow] = GR{
    prs => import prs._
    PartsRow.tupled((<<[Int], <<[String], <<[String], <<?[String]))
  }
  /** Table description of table parts. Objects of this class serve as prototypes for rows in queries.
   *  NOTE: The following names collided with Scala keywords and were escaped: type */
  class Parts(_tableTag: Tag) extends Table[PartsRow](_tableTag, "parts") {
    def * = (id, `type`, number, description) <> (PartsRow.tupled, PartsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(`type`), Rep.Some(number), description).shaped.<>({r=>import r._; _1.map(_=> PartsRow.tupled((_1.get, _2.get, _3.get, _4)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column type SqlType(ENUM), Length(5,false)
     *  NOTE: The name was escaped because it collided with a Scala keyword. */
    val `type`: Rep[String] = column[String]("type", O.Length(5,varying=false))
    /** Database column number SqlType(VARCHAR), Length(200,true) */
    val number: Rep[String] = column[String]("number", O.Length(200,varying=true))
    /** Database column description SqlType(TEXT), Default(None) */
    val description: Rep[Option[String]] = column[Option[String]]("description", O.Default(None))
  }
  /** Collection-like TableQuery object for table Parts */
  lazy val Parts = new TableQuery(tag => new Parts(tag))

  /** Entity class storing rows of table Salespeople
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param label Database column label SqlType(VARCHAR), Length(100,true) */
  case class SalespeopleRow(id: Int, label: String)
  /** GetResult implicit for fetching SalespeopleRow objects using plain SQL queries */
  implicit def GetResultSalespeopleRow(implicit e0: GR[Int], e1: GR[String]): GR[SalespeopleRow] = GR{
    prs => import prs._
    SalespeopleRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table salespeople. Objects of this class serve as prototypes for rows in queries. */
  class Salespeople(_tableTag: Tag) extends Table[SalespeopleRow](_tableTag, "salespeople") {
    def * = (id, label) <> (SalespeopleRow.tupled, SalespeopleRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(label)).shaped.<>({r=>import r._; _1.map(_=> SalespeopleRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))

    /** Uniqueness Index over (label) (database name label_UNIQUE) */
    val index1 = index("label_UNIQUE", label, unique=true)
  }
  /** Collection-like TableQuery object for table Salespeople */
  lazy val Salespeople = new TableQuery(tag => new Salespeople(tag))

  /** Entity class storing rows of table Schedules
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param jobId Database column job_id SqlType(INT UNSIGNED)
   *  @param scheduleType Database column schedule_type SqlType(ENUM), Length(12,false)
   *  @param startDate Database column start_date SqlType(DATE), Default(None)
   *  @param completeDate Database column complete_date SqlType(DATE), Default(None) */
  case class SchedulesRow(id: Int, jobId: Int, scheduleType: String, startDate: Option[java.sql.Date] = None, completeDate: Option[java.sql.Date] = None)
  /** GetResult implicit for fetching SchedulesRow objects using plain SQL queries */
  implicit def GetResultSchedulesRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[java.sql.Date]]): GR[SchedulesRow] = GR{
    prs => import prs._
    SchedulesRow.tupled((<<[Int], <<[Int], <<[String], <<?[java.sql.Date], <<?[java.sql.Date]))
  }
  /** Table description of table schedules. Objects of this class serve as prototypes for rows in queries. */
  class Schedules(_tableTag: Tag) extends Table[SchedulesRow](_tableTag, "schedules") {
    def * = (id, jobId, scheduleType, startDate, completeDate) <> (SchedulesRow.tupled, SchedulesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(jobId), Rep.Some(scheduleType), startDate, completeDate).shaped.<>({r=>import r._; _1.map(_=> SchedulesRow.tupled((_1.get, _2.get, _3.get, _4, _5)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column job_id SqlType(INT UNSIGNED) */
    val jobId: Rep[Int] = column[Int]("job_id")
    /** Database column schedule_type SqlType(ENUM), Length(12,false) */
    val scheduleType: Rep[String] = column[String]("schedule_type", O.Length(12,varying=false))
    /** Database column start_date SqlType(DATE), Default(None) */
    val startDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("start_date", O.Default(None))
    /** Database column complete_date SqlType(DATE), Default(None) */
    val completeDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("complete_date", O.Default(None))

    /** Foreign key referencing Jobs (database name job_schedules__jobs__fk) */
    lazy val jobsFk = foreignKey("job_schedules__jobs__fk", jobId, Jobs)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (jobId,scheduleType) (database name UNIQUE_JOB_SCHEDULE_TYPE) */
    val index1 = index("UNIQUE_JOB_SCHEDULE_TYPE", (jobId, scheduleType), unique=true)
  }
  /** Collection-like TableQuery object for table Schedules */
  lazy val Schedules = new TableQuery(tag => new Schedules(tag))

  /** Entity class storing rows of table ShipmentItems
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param shipmentId Database column shipment_id SqlType(INT UNSIGNED)
   *  @param shippingItemId Database column shipping_item_id SqlType(INT UNSIGNED)
   *  @param quantity Database column quantity SqlType(INT UNSIGNED), Default(0) */
  case class ShipmentItemsRow(id: Int, shipmentId: Int, shippingItemId: Int, quantity: Int = 0)
  /** GetResult implicit for fetching ShipmentItemsRow objects using plain SQL queries */
  implicit def GetResultShipmentItemsRow(implicit e0: GR[Int]): GR[ShipmentItemsRow] = GR{
    prs => import prs._
    ShipmentItemsRow.tupled((<<[Int], <<[Int], <<[Int], <<[Int]))
  }
  /** Table description of table shipment_items. Objects of this class serve as prototypes for rows in queries. */
  class ShipmentItems(_tableTag: Tag) extends Table[ShipmentItemsRow](_tableTag, "shipment_items") {
    def * = (id, shipmentId, shippingItemId, quantity) <> (ShipmentItemsRow.tupled, ShipmentItemsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(shipmentId), Rep.Some(shippingItemId), Rep.Some(quantity)).shaped.<>({r=>import r._; _1.map(_=> ShipmentItemsRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column shipment_id SqlType(INT UNSIGNED) */
    val shipmentId: Rep[Int] = column[Int]("shipment_id")
    /** Database column shipping_item_id SqlType(INT UNSIGNED) */
    val shippingItemId: Rep[Int] = column[Int]("shipping_item_id")
    /** Database column quantity SqlType(INT UNSIGNED), Default(0) */
    val quantity: Rep[Int] = column[Int]("quantity", O.Default(0))

    /** Foreign key referencing Shipments (database name shipment_items__shipments__fk) */
    lazy val shipmentsFk = foreignKey("shipment_items__shipments__fk", shipmentId, Shipments)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing ShippingItems (database name shipment_items__shipping_items__fk) */
    lazy val shippingItemsFk = foreignKey("shipment_items__shipping_items__fk", shippingItemId, ShippingItems)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (shipmentId,shippingItemId) (database name UNIQUE_SHIPMENT_SHIPPING_ITEM) */
    val index1 = index("UNIQUE_SHIPMENT_SHIPPING_ITEM", (shipmentId, shippingItemId), unique=true)
  }
  /** Collection-like TableQuery object for table ShipmentItems */
  lazy val ShipmentItems = new TableQuery(tag => new ShipmentItems(tag))

  /** Entity class storing rows of table Shipments
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param jobId Database column job_id SqlType(INT UNSIGNED)
   *  @param number Database column number SqlType(INT UNSIGNED), Default(1)
   *  @param status Database column status SqlType(ENUM), Length(9,false)
   *  @param shopId Database column shop_id SqlType(INT UNSIGNED)
   *  @param carrierId Database column carrier_id SqlType(INT UNSIGNED)
   *  @param weight Database column weight SqlType(INT UNSIGNED), Default(0)
   *  @param billOfLading Database column bill_of_lading SqlType(VARCHAR), Length(100,true), Default(None)
   *  @param shipDate Database column ship_date SqlType(DATE), Default(None)
   *  @param contactId Database column contact_id SqlType(INT UNSIGNED), Default(None)
   *  @param addressId Database column address_id SqlType(INT UNSIGNED), Default(None) */
  case class ShipmentsRow(id: Int, jobId: Int, number: Int = 1, status: String, shopId: Int, carrierId: Int, weight: Int = 0, billOfLading: Option[String] = None, shipDate: Option[java.sql.Date] = None, contactId: Option[Int] = None, addressId: Option[Int] = None)
  /** GetResult implicit for fetching ShipmentsRow objects using plain SQL queries */
  implicit def GetResultShipmentsRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[String]], e3: GR[Option[java.sql.Date]], e4: GR[Option[Int]]): GR[ShipmentsRow] = GR{
    prs => import prs._
    ShipmentsRow.tupled((<<[Int], <<[Int], <<[Int], <<[String], <<[Int], <<[Int], <<[Int], <<?[String], <<?[java.sql.Date], <<?[Int], <<?[Int]))
  }
  /** Table description of table shipments. Objects of this class serve as prototypes for rows in queries. */
  class Shipments(_tableTag: Tag) extends Table[ShipmentsRow](_tableTag, "shipments") {
    def * = (id, jobId, number, status, shopId, carrierId, weight, billOfLading, shipDate, contactId, addressId) <> (ShipmentsRow.tupled, ShipmentsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(jobId), Rep.Some(number), Rep.Some(status), Rep.Some(shopId), Rep.Some(carrierId), Rep.Some(weight), billOfLading, shipDate, contactId, addressId).shaped.<>({r=>import r._; _1.map(_=> ShipmentsRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8, _9, _10, _11)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column job_id SqlType(INT UNSIGNED) */
    val jobId: Rep[Int] = column[Int]("job_id")
    /** Database column number SqlType(INT UNSIGNED), Default(1) */
    val number: Rep[Int] = column[Int]("number", O.Default(1))
    /** Database column status SqlType(ENUM), Length(9,false) */
    val status: Rep[String] = column[String]("status", O.Length(9,varying=false))
    /** Database column shop_id SqlType(INT UNSIGNED) */
    val shopId: Rep[Int] = column[Int]("shop_id")
    /** Database column carrier_id SqlType(INT UNSIGNED) */
    val carrierId: Rep[Int] = column[Int]("carrier_id")
    /** Database column weight SqlType(INT UNSIGNED), Default(0) */
    val weight: Rep[Int] = column[Int]("weight", O.Default(0))
    /** Database column bill_of_lading SqlType(VARCHAR), Length(100,true), Default(None) */
    val billOfLading: Rep[Option[String]] = column[Option[String]]("bill_of_lading", O.Length(100,varying=true), O.Default(None))
    /** Database column ship_date SqlType(DATE), Default(None) */
    val shipDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("ship_date", O.Default(None))
    /** Database column contact_id SqlType(INT UNSIGNED), Default(None) */
    val contactId: Rep[Option[Int]] = column[Option[Int]]("contact_id", O.Default(None))
    /** Database column address_id SqlType(INT UNSIGNED), Default(None) */
    val addressId: Rep[Option[Int]] = column[Option[Int]]("address_id", O.Default(None))

    /** Foreign key referencing Addresses (database name shipments__addresses__fk) */
    lazy val addressesFk = foreignKey("shipments__addresses__fk", addressId, Addresses)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Carriers (database name shipments__carriers__fk) */
    lazy val carriersFk = foreignKey("shipments__carriers__fk", carrierId, Carriers)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Contacts (database name shipments__contacts__fk) */
    lazy val contactsFk = foreignKey("shipments__contacts__fk", contactId, Contacts)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Jobs (database name shipments__jobs__fk) */
    lazy val jobsFk = foreignKey("shipments__jobs__fk", jobId, Jobs)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Shops (database name shipments__shops__fk) */
    lazy val shopsFk = foreignKey("shipments__shops__fk", shopId, Shops)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (jobId,number) (database name UNIQUE_JOB_SHIPMENT) */
    val index1 = index("UNIQUE_JOB_SHIPMENT", (jobId, number), unique=true)
  }
  /** Collection-like TableQuery object for table Shipments */
  lazy val Shipments = new TableQuery(tag => new Shipments(tag))

  /** Entity class storing rows of table ShippingGroupItems
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param shippingGroupId Database column shipping_group_id SqlType(INT UNSIGNED)
   *  @param shippingItemId Database column shipping_item_id SqlType(INT UNSIGNED) */
  case class ShippingGroupItemsRow(id: Int, shippingGroupId: Int, shippingItemId: Int)
  /** GetResult implicit for fetching ShippingGroupItemsRow objects using plain SQL queries */
  implicit def GetResultShippingGroupItemsRow(implicit e0: GR[Int]): GR[ShippingGroupItemsRow] = GR{
    prs => import prs._
    ShippingGroupItemsRow.tupled((<<[Int], <<[Int], <<[Int]))
  }
  /** Table description of table shipping_group_items. Objects of this class serve as prototypes for rows in queries. */
  class ShippingGroupItems(_tableTag: Tag) extends Table[ShippingGroupItemsRow](_tableTag, "shipping_group_items") {
    def * = (id, shippingGroupId, shippingItemId) <> (ShippingGroupItemsRow.tupled, ShippingGroupItemsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(shippingGroupId), Rep.Some(shippingItemId)).shaped.<>({r=>import r._; _1.map(_=> ShippingGroupItemsRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column shipping_group_id SqlType(INT UNSIGNED) */
    val shippingGroupId: Rep[Int] = column[Int]("shipping_group_id")
    /** Database column shipping_item_id SqlType(INT UNSIGNED) */
    val shippingItemId: Rep[Int] = column[Int]("shipping_item_id")

    /** Foreign key referencing ShippingGroups (database name shipping_group_items__shipping_groups__fk) */
    lazy val shippingGroupsFk = foreignKey("shipping_group_items__shipping_groups__fk", shippingGroupId, ShippingGroups)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing ShippingItems (database name shipping_groupt_items__shipping_items__fk) */
    lazy val shippingItemsFk = foreignKey("shipping_groupt_items__shipping_items__fk", shippingItemId, ShippingItems)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (shippingGroupId,shippingItemId) (database name UNIQUE_GROUP_ITEM) */
    val index1 = index("UNIQUE_GROUP_ITEM", (shippingGroupId, shippingItemId), unique=true)
    /** Uniqueness Index over (shippingGroupId) (database name UNIQUE_GROUP_ITEM_LABEL) */
    val index2 = index("UNIQUE_GROUP_ITEM_LABEL", shippingGroupId, unique=true)
  }
  /** Collection-like TableQuery object for table ShippingGroupItems */
  lazy val ShippingGroupItems = new TableQuery(tag => new ShippingGroupItems(tag))

  /** Entity class storing rows of table ShippingGroups
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param jobId Database column job_id SqlType(INT UNSIGNED)
   *  @param label Database column label SqlType(VARCHAR), Length(100,true)
   *  @param rush Database column rush SqlType(BIT), Default(false)
   *  @param shippingRequestId Database column shipping_request_id SqlType(INT UNSIGNED), Default(None) */
  case class ShippingGroupsRow(id: Int, jobId: Int, label: String, rush: Boolean = false, shippingRequestId: Option[Int] = None)
  /** GetResult implicit for fetching ShippingGroupsRow objects using plain SQL queries */
  implicit def GetResultShippingGroupsRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Boolean], e3: GR[Option[Int]]): GR[ShippingGroupsRow] = GR{
    prs => import prs._
    ShippingGroupsRow.tupled((<<[Int], <<[Int], <<[String], <<[Boolean], <<?[Int]))
  }
  /** Table description of table shipping_groups. Objects of this class serve as prototypes for rows in queries. */
  class ShippingGroups(_tableTag: Tag) extends Table[ShippingGroupsRow](_tableTag, "shipping_groups") {
    def * = (id, jobId, label, rush, shippingRequestId) <> (ShippingGroupsRow.tupled, ShippingGroupsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(jobId), Rep.Some(label), Rep.Some(rush), shippingRequestId).shaped.<>({r=>import r._; _1.map(_=> ShippingGroupsRow.tupled((_1.get, _2.get, _3.get, _4.get, _5)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column job_id SqlType(INT UNSIGNED) */
    val jobId: Rep[Int] = column[Int]("job_id")
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))
    /** Database column rush SqlType(BIT), Default(false) */
    val rush: Rep[Boolean] = column[Boolean]("rush", O.Default(false))
    /** Database column shipping_request_id SqlType(INT UNSIGNED), Default(None) */
    val shippingRequestId: Rep[Option[Int]] = column[Option[Int]]("shipping_request_id", O.Default(None))

    /** Foreign key referencing Jobs (database name shipping_groups__jobs__fk) */
    lazy val jobsFk = foreignKey("shipping_groups__jobs__fk", jobId, Jobs)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing ShippingRequests (database name shipping_groups__shipping_requests__fk) */
    lazy val shippingRequestsFk = foreignKey("shipping_groups__shipping_requests__fk", shippingRequestId, ShippingRequests)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (jobId,label) (database name UNIQUE_JOB_SHIPPING_GROUP_LABEL) */
    val index1 = index("UNIQUE_JOB_SHIPPING_GROUP_LABEL", (jobId, label), unique=true)
  }
  /** Collection-like TableQuery object for table ShippingGroups */
  lazy val ShippingGroups = new TableQuery(tag => new ShippingGroups(tag))

  /** Entity class storing rows of table ShippingItems
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param status Database column status SqlType(ENUM), Length(6,false)
   *  @param label Database column label SqlType(VARCHAR), Length(100,true), Default(None)
   *  @param requested Database column requested SqlType(INT UNSIGNED), Default(0)
   *  @param completed Database column completed SqlType(INT UNSIGNED), Default(0)
   *  @param remarks Database column remarks SqlType(TEXT), Default(None)
   *  @param shopId Database column shop_id SqlType(INT UNSIGNED), Default(None) */
  case class ShippingItemsRow(id: Int, status: String, label: Option[String] = None, requested: Int = 0, completed: Int = 0, remarks: Option[String] = None, shopId: Option[Int] = None)
  /** GetResult implicit for fetching ShippingItemsRow objects using plain SQL queries */
  implicit def GetResultShippingItemsRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[String]], e3: GR[Option[Int]]): GR[ShippingItemsRow] = GR{
    prs => import prs._
    ShippingItemsRow.tupled((<<[Int], <<[String], <<?[String], <<[Int], <<[Int], <<?[String], <<?[Int]))
  }
  /** Table description of table shipping_items. Objects of this class serve as prototypes for rows in queries. */
  class ShippingItems(_tableTag: Tag) extends Table[ShippingItemsRow](_tableTag, "shipping_items") {
    def * = (id, status, label, requested, completed, remarks, shopId) <> (ShippingItemsRow.tupled, ShippingItemsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(status), label, Rep.Some(requested), Rep.Some(completed), remarks, shopId).shaped.<>({r=>import r._; _1.map(_=> ShippingItemsRow.tupled((_1.get, _2.get, _3, _4.get, _5.get, _6, _7)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column status SqlType(ENUM), Length(6,false) */
    val status: Rep[String] = column[String]("status", O.Length(6,varying=false))
    /** Database column label SqlType(VARCHAR), Length(100,true), Default(None) */
    val label: Rep[Option[String]] = column[Option[String]]("label", O.Length(100,varying=true), O.Default(None))
    /** Database column requested SqlType(INT UNSIGNED), Default(0) */
    val requested: Rep[Int] = column[Int]("requested", O.Default(0))
    /** Database column completed SqlType(INT UNSIGNED), Default(0) */
    val completed: Rep[Int] = column[Int]("completed", O.Default(0))
    /** Database column remarks SqlType(TEXT), Default(None) */
    val remarks: Rep[Option[String]] = column[Option[String]]("remarks", O.Default(None))
    /** Database column shop_id SqlType(INT UNSIGNED), Default(None) */
    val shopId: Rep[Option[Int]] = column[Option[Int]]("shop_id", O.Default(None))

    /** Foreign key referencing Shops (database name shipping_items__shops__fk) */
    lazy val shopsFk = foreignKey("shipping_items__shops__fk", shopId, Shops)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table ShippingItems */
  lazy val ShippingItems = new TableQuery(tag => new ShippingItems(tag))

  /** Entity class storing rows of table ShippingItemZones
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param shippingItemId Database column shipping_item_id SqlType(INT UNSIGNED)
   *  @param zoneId Database column zone_id SqlType(INT UNSIGNED)
   *  @param quantity Database column quantity SqlType(INT UNSIGNED), Default(0) */
  case class ShippingItemZonesRow(id: Int, shippingItemId: Int, zoneId: Int, quantity: Int = 0)
  /** GetResult implicit for fetching ShippingItemZonesRow objects using plain SQL queries */
  implicit def GetResultShippingItemZonesRow(implicit e0: GR[Int]): GR[ShippingItemZonesRow] = GR{
    prs => import prs._
    ShippingItemZonesRow.tupled((<<[Int], <<[Int], <<[Int], <<[Int]))
  }
  /** Table description of table shipping_item_zones. Objects of this class serve as prototypes for rows in queries. */
  class ShippingItemZones(_tableTag: Tag) extends Table[ShippingItemZonesRow](_tableTag, "shipping_item_zones") {
    def * = (id, shippingItemId, zoneId, quantity) <> (ShippingItemZonesRow.tupled, ShippingItemZonesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(shippingItemId), Rep.Some(zoneId), Rep.Some(quantity)).shaped.<>({r=>import r._; _1.map(_=> ShippingItemZonesRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column shipping_item_id SqlType(INT UNSIGNED) */
    val shippingItemId: Rep[Int] = column[Int]("shipping_item_id")
    /** Database column zone_id SqlType(INT UNSIGNED) */
    val zoneId: Rep[Int] = column[Int]("zone_id")
    /** Database column quantity SqlType(INT UNSIGNED), Default(0) */
    val quantity: Rep[Int] = column[Int]("quantity", O.Default(0))

    /** Foreign key referencing ShippingItems (database name shipping_item_zones__shipping_items__fk) */
    lazy val shippingItemsFk = foreignKey("shipping_item_zones__shipping_items__fk", shippingItemId, ShippingItems)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Zones (database name shipping_item_zones__zones__fk) */
    lazy val zonesFk = foreignKey("shipping_item_zones__zones__fk", zoneId, Zones)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (shippingItemId,zoneId) (database name UNIQUE_SHIPPING_ITEM_ZONE) */
    val index1 = index("UNIQUE_SHIPPING_ITEM_ZONE", (shippingItemId, zoneId), unique=true)
  }
  /** Collection-like TableQuery object for table ShippingItemZones */
  lazy val ShippingItemZones = new TableQuery(tag => new ShippingItemZones(tag))

  /** Entity class storing rows of table ShippingRequests
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param tagType Database column tag_type SqlType(ENUM), Length(2,false), Default(None)
   *  @param title Database column title SqlType(TEXT), Default(None)
   *  @param revision Database column revision SqlType(VARCHAR), Length(100,true), Default(None)
   *  @param revisionDate Database column revision_date SqlType(DATE), Default(None)
   *  @param startDate Database column start_date SqlType(DATE), Default(None)
   *  @param shopDate Database column shop_date SqlType(DATE), Default(None)
   *  @param fieldDate Database column field_date SqlType(DATE), Default(None)
   *  @param requestDate Database column request_date SqlType(DATE), Default(None)
   *  @param requestedBy Database column requested_by SqlType(VARCHAR), Length(100,true), Default(None)
   *  @param preparedBy Database column prepared_by SqlType(VARCHAR), Length(100,true), Default(None)
   *  @param fileId Database column file_id SqlType(INT UNSIGNED), Default(None)
   *  @param shopId Database column shop_id SqlType(INT UNSIGNED), Default(None)
   *  @param carrierId Database column carrier_id SqlType(INT UNSIGNED), Default(None)
   *  @param contactId Database column contact_id SqlType(INT UNSIGNED), Default(None)
   *  @param addressId Database column address_id SqlType(INT UNSIGNED), Default(None) */
  case class ShippingRequestsRow(id: Int, tagType: Option[String] = None, title: Option[String] = None, revision: Option[String] = None, revisionDate: Option[java.sql.Date] = None, startDate: Option[java.sql.Date] = None, shopDate: Option[java.sql.Date] = None, fieldDate: Option[java.sql.Date] = None, requestDate: Option[java.sql.Date] = None, requestedBy: Option[String] = None, preparedBy: Option[String] = None, fileId: Option[Int] = None, shopId: Option[Int] = None, carrierId: Option[Int] = None, contactId: Option[Int] = None, addressId: Option[Int] = None)
  /** GetResult implicit for fetching ShippingRequestsRow objects using plain SQL queries */
  implicit def GetResultShippingRequestsRow(implicit e0: GR[Int], e1: GR[Option[String]], e2: GR[Option[java.sql.Date]], e3: GR[Option[Int]]): GR[ShippingRequestsRow] = GR{
    prs => import prs._
    ShippingRequestsRow.tupled((<<[Int], <<?[String], <<?[String], <<?[String], <<?[java.sql.Date], <<?[java.sql.Date], <<?[java.sql.Date], <<?[java.sql.Date], <<?[java.sql.Date], <<?[String], <<?[String], <<?[Int], <<?[Int], <<?[Int], <<?[Int], <<?[Int]))
  }
  /** Table description of table shipping_requests. Objects of this class serve as prototypes for rows in queries. */
  class ShippingRequests(_tableTag: Tag) extends Table[ShippingRequestsRow](_tableTag, "shipping_requests") {
    def * = (id, tagType, title, revision, revisionDate, startDate, shopDate, fieldDate, requestDate, requestedBy, preparedBy, fileId, shopId, carrierId, contactId, addressId) <> (ShippingRequestsRow.tupled, ShippingRequestsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), tagType, title, revision, revisionDate, startDate, shopDate, fieldDate, requestDate, requestedBy, preparedBy, fileId, shopId, carrierId, contactId, addressId).shaped.<>({r=>import r._; _1.map(_=> ShippingRequestsRow.tupled((_1.get, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column tag_type SqlType(ENUM), Length(2,false), Default(None) */
    val tagType: Rep[Option[String]] = column[Option[String]]("tag_type", O.Length(2,varying=false), O.Default(None))
    /** Database column title SqlType(TEXT), Default(None) */
    val title: Rep[Option[String]] = column[Option[String]]("title", O.Default(None))
    /** Database column revision SqlType(VARCHAR), Length(100,true), Default(None) */
    val revision: Rep[Option[String]] = column[Option[String]]("revision", O.Length(100,varying=true), O.Default(None))
    /** Database column revision_date SqlType(DATE), Default(None) */
    val revisionDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("revision_date", O.Default(None))
    /** Database column start_date SqlType(DATE), Default(None) */
    val startDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("start_date", O.Default(None))
    /** Database column shop_date SqlType(DATE), Default(None) */
    val shopDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("shop_date", O.Default(None))
    /** Database column field_date SqlType(DATE), Default(None) */
    val fieldDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("field_date", O.Default(None))
    /** Database column request_date SqlType(DATE), Default(None) */
    val requestDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("request_date", O.Default(None))
    /** Database column requested_by SqlType(VARCHAR), Length(100,true), Default(None) */
    val requestedBy: Rep[Option[String]] = column[Option[String]]("requested_by", O.Length(100,varying=true), O.Default(None))
    /** Database column prepared_by SqlType(VARCHAR), Length(100,true), Default(None) */
    val preparedBy: Rep[Option[String]] = column[Option[String]]("prepared_by", O.Length(100,varying=true), O.Default(None))
    /** Database column file_id SqlType(INT UNSIGNED), Default(None) */
    val fileId: Rep[Option[Int]] = column[Option[Int]]("file_id", O.Default(None))
    /** Database column shop_id SqlType(INT UNSIGNED), Default(None) */
    val shopId: Rep[Option[Int]] = column[Option[Int]]("shop_id", O.Default(None))
    /** Database column carrier_id SqlType(INT UNSIGNED), Default(None) */
    val carrierId: Rep[Option[Int]] = column[Option[Int]]("carrier_id", O.Default(None))
    /** Database column contact_id SqlType(INT UNSIGNED), Default(None) */
    val contactId: Rep[Option[Int]] = column[Option[Int]]("contact_id", O.Default(None))
    /** Database column address_id SqlType(INT UNSIGNED), Default(None) */
    val addressId: Rep[Option[Int]] = column[Option[Int]]("address_id", O.Default(None))

    /** Foreign key referencing Addresses (database name shipping_requests__addresses__fk) */
    lazy val addressesFk = foreignKey("shipping_requests__addresses__fk", addressId, Addresses)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Carriers (database name shipping_requests__carriers__fk) */
    lazy val carriersFk = foreignKey("shipping_requests__carriers__fk", carrierId, Carriers)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Contacts (database name shipping_requests__contacts__fk) */
    lazy val contactsFk = foreignKey("shipping_requests__contacts__fk", contactId, Contacts)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Files (database name shipping_requests__files__fk) */
    lazy val filesFk = foreignKey("shipping_requests__files__fk", fileId, Files)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Shops (database name shipping_requests__shops__fk) */
    lazy val shopsFk = foreignKey("shipping_requests__shops__fk", shopId, Shops)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table ShippingRequests */
  lazy val ShippingRequests = new TableQuery(tag => new ShippingRequests(tag))

  /** Entity class storing rows of table Shops
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param label Database column label SqlType(VARCHAR), Length(100,true) */
  case class ShopsRow(id: Int, label: String)
  /** GetResult implicit for fetching ShopsRow objects using plain SQL queries */
  implicit def GetResultShopsRow(implicit e0: GR[Int], e1: GR[String]): GR[ShopsRow] = GR{
    prs => import prs._
    ShopsRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table shops. Objects of this class serve as prototypes for rows in queries. */
  class Shops(_tableTag: Tag) extends Table[ShopsRow](_tableTag, "shops") {
    def * = (id, label) <> (ShopsRow.tupled, ShopsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(label)).shaped.<>({r=>import r._; _1.map(_=> ShopsRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))

    /** Uniqueness Index over (label) (database name label_UNIQUE) */
    val index1 = index("label_UNIQUE", label, unique=true)
  }
  /** Collection-like TableQuery object for table Shops */
  lazy val Shops = new TableQuery(tag => new Shops(tag))

  /** Entity class storing rows of table SpecialtyItems
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param label Database column label SqlType(VARCHAR), Length(100,true) */
  case class SpecialtyItemsRow(id: Int, label: String)
  /** GetResult implicit for fetching SpecialtyItemsRow objects using plain SQL queries */
  implicit def GetResultSpecialtyItemsRow(implicit e0: GR[Int], e1: GR[String]): GR[SpecialtyItemsRow] = GR{
    prs => import prs._
    SpecialtyItemsRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table specialty_items. Objects of this class serve as prototypes for rows in queries. */
  class SpecialtyItems(_tableTag: Tag) extends Table[SpecialtyItemsRow](_tableTag, "specialty_items") {
    def * = (id, label) <> (SpecialtyItemsRow.tupled, SpecialtyItemsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(label)).shaped.<>({r=>import r._; _1.map(_=> SpecialtyItemsRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))

    /** Uniqueness Index over (label) (database name label_UNIQUE) */
    val index1 = index("label_UNIQUE", label, unique=true)
  }
  /** Collection-like TableQuery object for table SpecialtyItems */
  lazy val SpecialtyItems = new TableQuery(tag => new SpecialtyItems(tag))

  /** Entity class storing rows of table UserRoles
   *  @param userId Database column user_id SqlType(INT UNSIGNED)
   *  @param role Database column role SqlType(ENUM), Length(8,false)
   *  @param active Database column active SqlType(BIT), Default(true) */
  case class UserRolesRow(userId: Int, role: String, active: Boolean = true)
  /** GetResult implicit for fetching UserRolesRow objects using plain SQL queries */
  implicit def GetResultUserRolesRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Boolean]): GR[UserRolesRow] = GR{
    prs => import prs._
    UserRolesRow.tupled((<<[Int], <<[String], <<[Boolean]))
  }
  /** Table description of table user_roles. Objects of this class serve as prototypes for rows in queries. */
  class UserRoles(_tableTag: Tag) extends Table[UserRolesRow](_tableTag, "user_roles") {
    def * = (userId, role, active) <> (UserRolesRow.tupled, UserRolesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(userId), Rep.Some(role), Rep.Some(active)).shaped.<>({r=>import r._; _1.map(_=> UserRolesRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column user_id SqlType(INT UNSIGNED) */
    val userId: Rep[Int] = column[Int]("user_id")
    /** Database column role SqlType(ENUM), Length(8,false) */
    val role: Rep[String] = column[String]("role", O.Length(8,varying=false))
    /** Database column active SqlType(BIT), Default(true) */
    val active: Rep[Boolean] = column[Boolean]("active", O.Default(true))

    /** Primary key of UserRoles (database name user_roles_PK) */
    val pk = primaryKey("user_roles_PK", (userId, role))

    /** Foreign key referencing Users (database name user_roles__users__fk) */
    lazy val usersFk = foreignKey("user_roles__users__fk", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table UserRoles */
  lazy val UserRoles = new TableQuery(tag => new UserRoles(tag))

  /** Entity class storing rows of table Users
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param username Database column username SqlType(VARCHAR), Length(100,true)
   *  @param password Database column password SqlType(CHAR), Length(60,false)
   *  @param active Database column active SqlType(BIT), Default(true) */
  case class UsersRow(id: Int, username: String, password: String, active: Boolean = true)
  /** GetResult implicit for fetching UsersRow objects using plain SQL queries */
  implicit def GetResultUsersRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Boolean]): GR[UsersRow] = GR{
    prs => import prs._
    UsersRow.tupled((<<[Int], <<[String], <<[String], <<[Boolean]))
  }
  /** Table description of table users. Objects of this class serve as prototypes for rows in queries. */
  class Users(_tableTag: Tag) extends Table[UsersRow](_tableTag, "users") {
    def * = (id, username, password, active) <> (UsersRow.tupled, UsersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(username), Rep.Some(password), Rep.Some(active)).shaped.<>({r=>import r._; _1.map(_=> UsersRow.tupled((_1.get, _2.get, _3.get, _4.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column username SqlType(VARCHAR), Length(100,true) */
    val username: Rep[String] = column[String]("username", O.Length(100,varying=true))
    /** Database column password SqlType(CHAR), Length(60,false) */
    val password: Rep[String] = column[String]("password", O.Length(60,varying=false))
    /** Database column active SqlType(BIT), Default(true) */
    val active: Rep[Boolean] = column[Boolean]("active", O.Default(true))

    /** Uniqueness Index over (username) (database name username_UNIQUE) */
    val index1 = index("username_UNIQUE", username, unique=true)
  }
  /** Collection-like TableQuery object for table Users */
  lazy val Users = new TableQuery(tag => new Users(tag))

  /** Entity class storing rows of table UserTokens
   *  @param userId Database column user_id SqlType(INT UNSIGNED), PrimaryKey
   *  @param token Database column token SqlType(CHAR), Length(36,false)
   *  @param expires Database column expires SqlType(DATETIME), Default(None) */
  case class UserTokensRow(userId: Int, token: String, expires: Option[java.sql.Timestamp] = None)
  /** GetResult implicit for fetching UserTokensRow objects using plain SQL queries */
  implicit def GetResultUserTokensRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[java.sql.Timestamp]]): GR[UserTokensRow] = GR{
    prs => import prs._
    UserTokensRow.tupled((<<[Int], <<[String], <<?[java.sql.Timestamp]))
  }
  /** Table description of table user_tokens. Objects of this class serve as prototypes for rows in queries. */
  class UserTokens(_tableTag: Tag) extends Table[UserTokensRow](_tableTag, "user_tokens") {
    def * = (userId, token, expires) <> (UserTokensRow.tupled, UserTokensRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(userId), Rep.Some(token), expires).shaped.<>({r=>import r._; _1.map(_=> UserTokensRow.tupled((_1.get, _2.get, _3)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column user_id SqlType(INT UNSIGNED), PrimaryKey */
    val userId: Rep[Int] = column[Int]("user_id", O.PrimaryKey)
    /** Database column token SqlType(CHAR), Length(36,false) */
    val token: Rep[String] = column[String]("token", O.Length(36,varying=false))
    /** Database column expires SqlType(DATETIME), Default(None) */
    val expires: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("expires", O.Default(None))

    /** Foreign key referencing Users (database name user_tokens__users__fk) */
    lazy val usersFk = foreignKey("user_tokens__users__fk", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (token) (database name token_UNIQUE) */
    val index1 = index("token_UNIQUE", token, unique=true)
  }
  /** Collection-like TableQuery object for table UserTokens */
  lazy val UserTokens = new TableQuery(tag => new UserTokens(tag))

  /** Entity class storing rows of table Vendors
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param label Database column label SqlType(VARCHAR), Length(100,true) */
  case class VendorsRow(id: Int, label: String)
  /** GetResult implicit for fetching VendorsRow objects using plain SQL queries */
  implicit def GetResultVendorsRow(implicit e0: GR[Int], e1: GR[String]): GR[VendorsRow] = GR{
    prs => import prs._
    VendorsRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table vendors. Objects of this class serve as prototypes for rows in queries. */
  class Vendors(_tableTag: Tag) extends Table[VendorsRow](_tableTag, "vendors") {
    def * = (id, label) <> (VendorsRow.tupled, VendorsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(label)).shaped.<>({r=>import r._; _1.map(_=> VendorsRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column label SqlType(VARCHAR), Length(100,true) */
    val label: Rep[String] = column[String]("label", O.Length(100,varying=true))

    /** Uniqueness Index over (label) (database name label_UNIQUE) */
    val index1 = index("label_UNIQUE", label, unique=true)
  }
  /** Collection-like TableQuery object for table Vendors */
  lazy val Vendors = new TableQuery(tag => new Vendors(tag))

  /** Entity class storing rows of table Zones
   *  @param id Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey
   *  @param jobId Database column job_id SqlType(INT UNSIGNED)
   *  @param number Database column number SqlType(INT UNSIGNED), Default(1)
   *  @param fieldDate Database column field_date SqlType(DATE), Default(None) */
  case class ZonesRow(id: Int, jobId: Int, number: Int = 1, fieldDate: Option[java.sql.Date] = None)
  /** GetResult implicit for fetching ZonesRow objects using plain SQL queries */
  implicit def GetResultZonesRow(implicit e0: GR[Int], e1: GR[Option[java.sql.Date]]): GR[ZonesRow] = GR{
    prs => import prs._
    ZonesRow.tupled((<<[Int], <<[Int], <<[Int], <<?[java.sql.Date]))
  }
  /** Table description of table zones. Objects of this class serve as prototypes for rows in queries. */
  class Zones(_tableTag: Tag) extends Table[ZonesRow](_tableTag, "zones") {
    def * = (id, jobId, number, fieldDate) <> (ZonesRow.tupled, ZonesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(id), Rep.Some(jobId), Rep.Some(number), fieldDate).shaped.<>({r=>import r._; _1.map(_=> ZonesRow.tupled((_1.get, _2.get, _3.get, _4)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(INT UNSIGNED), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column job_id SqlType(INT UNSIGNED) */
    val jobId: Rep[Int] = column[Int]("job_id")
    /** Database column number SqlType(INT UNSIGNED), Default(1) */
    val number: Rep[Int] = column[Int]("number", O.Default(1))
    /** Database column field_date SqlType(DATE), Default(None) */
    val fieldDate: Rep[Option[java.sql.Date]] = column[Option[java.sql.Date]]("field_date", O.Default(None))

    /** Foreign key referencing Jobs (database name zones__jobs__fk) */
    lazy val jobsFk = foreignKey("zones__jobs__fk", jobId, Jobs)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (jobId,number) (database name UNIQUE_JOB_ZONE_NUMBER) */
    val index1 = index("UNIQUE_JOB_ZONE_NUMBER", (jobId, number), unique=true)
  }
  /** Collection-like TableQuery object for table Zones */
  lazy val Zones = new TableQuery(tag => new Zones(tag))
}
