create table if not exists `ssi-business`.contactjobTemp(
	`id` int unsigned not null auto_increment,
    `jobid` int unsigned not null,
    `type` ENUM('Job','Drawing','Shipments') NOT NULL,
    primary key (`id`)
);

create table if not exists `ssi-business`.idsLinkTemp(
	shipping_items_id int unsigned not null auto_increment,
    jobid int unsigned,
    dwgid int unsigned,
	mark VARCHAR(255),
    tagid int unsigned,
    primary key (shipping_items_id)
);

create table if not exists `ssi-business`.addressjobTemp(
	`addressesid` int unsigned not null auto_increment,
    `jobid` int unsigned not null,
    `type` ENUM('Job','Drawing','Shipments') NOT NULL,
    primary key (`addressesid`)
);

create table if not exists `ssi-business`.dwgshipreqLinkTemp(
	`shipping_request_id` int unsigned not null auto_increment,
    `dwg_id` int unsigned not null,
    primary key (`shipping_request_id`)
);

create table if not exists `ssi-business`.validtagTemp(
	`id` int unsigned not null auto_increment,
    primary key (`id`)
);

create table if not exists `ssi-business`.validshipperTemp(
	`id` int unsigned not null auto_increment,
    primary key (`id`)
);

/*insert into dwgshipreqLinkTemp
select * from `ssi-business`.dwgshipreqLinkTemp;

delete from `ssi-business`.dwgshipreqLinkTemp;*/

insert into `ssi-business`.dwgshipreqLinkTemp (dwg_id)

select d.DWGID from `Material Shipper`.drawings d where d.`delete` != 1
and (d.`tag type` in ('S','W') or d.`tag type` is null)
and d.`DWG TYPE` in ('DETAIL','LAYOUT','VOID','RMS');


/*insert into idsLinkTemp
select * from `ssi-business`.idsLinkTemp;

delete from `ssi-business`.idsLinkTemp;*/

insert into `ssi-business`.idsLinkTemp (jobid, dwgid, mark, tagid)

select t.jobid, t.DWGID, t.MARK, t.TAGID from `Material Shipper`.tags t where t.`DELETE` != 1;

/*insert into carriers
select * from `ssi-business`.carriers;

delete from `ssi-business`.carriers;*/

insert into `ssi-business`.carriers
select * from `Material Shipper`.`ship via` sv;

insert into `ssi-business`.carriers (label)

select distinct shipvia from `Material Shipper`.drawings where shipvia  not in (select label from carriers);

/*insert into manufacturers
select * from `ssi-business`.manufacturers;

delete from `ssi-business`.manufacturers;*/

insert into `ssi-business`.manufacturers
select * from `Material Shipper`.manufacturers m;

/*insert into vendors
select * from `ssi-business`.vendors;

delete from `ssi-business`.vendors;*/

insert into `ssi-business`.vendors
select * from `Material Shipper`.vendors sv;

/*insert into customers
select * from `ssi-business`.customers;

delete from `ssi-business`.customers;*/

insert into `ssi-business`.customers
select * from `Material Shipper`.customers c
where c.CUSTOMER is not null;

insert into `ssi-business`.customers (label)
select distinct(customer) from `Material Shipper`.jobs j
where j.customer not in(select label from customers);

/*insert into shops
select * from `ssi-business`.shops;

delete from `ssi-business`.shops;*/

insert into `ssi-business`.shops

select * from `Material Shipper`.shops s
where s.SHOP is not null;

/*insert into contactjobTemp
select * from `ssi-business`.contactjobTemp;

delete from `ssi-business`.contactjobTemp;*/

insert into `ssi-business`.contactjobTemp (jobid,type) 

select j.jobid,'Job' from `Material Shipper`.jobs j 
where not(
	(j.CONTACT = '' or j.contact is null) 
and (j.PHONE = ''  or j.phone is null) 
and (j.fax = '' or j.fax is null) 
and (j.EMAIL = '' or j.email is null)
);

insert into `ssi-business`.contactjobTemp (jobid,type) 

select d.dwgid,'Drawing' from `Material Shipper`.drawings d 
where not(
	(d.`SHIP TO CONTACT` = '' or d.`SHIP TO CONTACT` is null) 
);

insert into `ssi-business`.contactjobTemp (jobid,type) 

select s.shipperid,'Shipments' from `Material Shipper`.shipments s 
where not(
	(s.`SHIP TO CONTACT` = '' or s.`SHIP TO CONTACT` is null) 
);

/*insert into CONTACTS
select * from `ssi-business`.contacts;

delete from `ssi-business`.contacts;*/

insert into `ssi-business`.contacts

SELECT cj.id, j.contact as label, j.phone, j.fax, j.email 
FROM `Material Shipper`.jobs j
JOIN `ssi-business`.contactjobTemp cj
ON j.jobid = cj.jobid and type = 'Job';

insert into `ssi-business`.contacts (id, label)

SELECT cj.id, d.`SHIP TO CONTACT`
FROM `Material Shipper`.drawings d
JOIN `ssi-business`.contactjobTemp cj
ON d.dwgid = cj.jobid and type = 'Drawing';

insert into `ssi-business`.contacts (id, label)

SELECT cj.id, d.`SHIP TO CONTACT`
FROM `Material Shipper`.shipments d
JOIN `ssi-business`.contactjobTemp cj
ON d.shipperid = cj.jobid and type = 'Shipments';

/*insert into salespeople
select * from `ssi-business`.salespeople;

delete from `ssi-business`.salespeople;*/

insert into `ssi-business`.salespeople (label)

select distinct salesman from `buddy order data`.`buddy orders` where salesman is not null and salesman != '';

/*insert into jobs
select * from `ssi-business`.jobs;

delete from `ssi-business`.jobs;*/

insert into `ssi-business`.jobs

select * from (
SELECT 
    j.jobid as jobid,
    SUBSTRING_INDEX(j.JOB, '-', 1) AS prefix,
    (SELECT 
            CASE
                    WHEN
                        CAST(
                        SUBSTRING_INDEX(SUBSTRING_INDEX(j.JOB, '-', 2), '-', - 1)
                            AS DECIMAL)
                            < 17
                    THEN
                        CONCAT(20,
                                SUBSTRING_INDEX(SUBSTRING_INDEX(j.JOB, '-', 2), '-', - 1))
                    ELSE CONCAT(19,
                            SUBSTRING_INDEX(SUBSTRING_INDEX(j.JOB, '-', 2), '-', - 1))
                END
        ) AS year,
    SUBSTRING_INDEX(SUBSTR(j.JOB,
                (LENGTH(SUBSTRING_INDEX(j.JOB, '-', 2)) + 2)),
            '-',
            3) AS Label,
            (SELECT 
            CASE j.`delete`
                    WHEN 1 THEN 'DELETED'
                    ELSE CASE (SELECT 
                                1
                            FROM
                                `Material Shipper`.`date closed` dc
                            WHERE
                                dateclosed IS NOT NULL
                                    AND jobId LIKE j.JOBID)
                            WHEN 1 THEN 'COMPLETED'
                            ELSE CASE j.active
							WHEN 1 THEN 'ACTIVE'
                        ELSE 'INACTIVE'
                        END
                    END
                END
        ) AS status,
    j.DESCRIPTION as description,
    (SELECT `contract price` FROM `buddy order data`.`buddy orders` where jobid = j.jobid) AS contractPrice,
    (select s.ENTRYDATE from `Material Shipper`.schedule s where s.jobid = j.jobid and s.`DELETE` != 1 ORDER BY s.SCHEDID DESC LIMIT 1) AS startDate,
    (select s.SHIPEND from `Material Shipper`.schedule s where s.jobid = j.jobid and s.`DELETE` != 1 ORDER BY s.SCHEDID DESC LIMIT 1) AS dueDate,
    (SELECT 
            `id`
        FROM
            `ssi-business`.shops
        WHERE
            label = j.SHOP) AS shopid,
    (select id from salespeople where label = (SELECT salesman FROM `buddy order data`.`buddy orders` where jobid = j.jobid)) AS salespersonId,
    (SELECT 
            id
        FROM
            `ssi-business`.customers c
        where c.label = j.customer) AS customerid,
    (select cj.id from `ssi-business`.contactjobTemp cj where cj.jobid = j.jobid) AS contactId,
    (select s.CLOSEDDATE from `Material Shipper`.schedule s where s.jobid = j.jobid and s.`DELETE` != 1 ORDER BY s.SCHEDID DESC LIMIT 1) AS completedDate    
FROM
    `Material Shipper`.jobs j
    where j.job is not null
    and j.`delete` != 1
) as tab where prefix in ('B','F','FC','FE','FR','FS','M','MF','MT','RG','BM','LM','MM','D','G','DR','EE','ME','MS','TM');


/*insert into schedules
select * from `ssi-business`.schedules;

delete from `ssi-business`.schedules;*/

INSERT into `ssi-business`.`schedules` (job_id, schedule_type,  start_date, complete_date)

select * from(
	SELECT s.`JOBID`, 'ENGINEERING'  AS schedule_type, 
	s.`ENGSTART` as start_date, 
	s.`ENGEND` as complete_date 
	FROM `Material Shipper`.`schedule` AS s 
	WHERE s.`JOBID` IS NOT NULL
	and s.engstart is not null or s.engend is not null
    and `delete` != 1
	UNION
	SELECT
	s.`JOBID`,
	'MECHANICAL' AS schedule_type,
	s.FABSTART as start_date,
	s.`FABEND` as complete_date
	FROM `Material Shipper`.`schedule` AS s
	WHERE s.`JOBID` IS NOT NULL
	and s.fabstart is not null or s.fabend is not null
    and `delete` != 1
	UNION
	SELECT
	s.`JOBID`,
	'ELECTRICAL' AS schedule_type,
	s.`PANELSTART` as  start_date  ,
	s.`PANELEND` as complete_date
	FROM `Material Shipper`.`schedule` AS s
	WHERE s.`JOBID` IS NOT NULL
	and s.panelstart is not null or s.panelend is not null
    and `delete` != 1 
	UNION
	SELECT
	s.`JOBID`,
	'SHIPPING' AS schedule_type,
	s.`SHIPSTART` as start_date,
	s.`SHIPEND` as complete_date
	FROM `Material Shipper`.`schedule` AS s
	WHERE s.`JOBID` IS NOT NULL
	and s.shipstart is not null or s.shipend is not null
    and `delete` != 1
	UNION
	SELECT
	s.`JOBID`,
	'INSTALLATION' AS schedule_type,
	s.`FIELDSTART`  as start_date,
	s.`FIELDEND` as  complete_date
	FROM `Material Shipper`.`schedule` AS s
	WHERE s.`JOBID` IS NOT NULL
	and s.fieldstart is not null or s.fieldend is not null
) as sched where jobid in (select id from `ssi-business`.jobs);

/*insert into shipping_items
select * from `ssi-business`.shipping_items;

delete from `ssi-business`.shipping_items;*/

INSERT into `ssi-business`.`shipping_items`

select  i.shipping_items_id,
		(SELECT CASE WHEN t.status is null THEN 'NS' ELSE t.status END) AS status,
		t.description, 
		(SELECT CASE WHEN t.`qty reqd` is null THEN 0 ELSE t.`qty reqd` END) AS required,
		(SELECT CASE WHEN t.`qty comp` is null THEN 0 ELSE t.`qty comp` END) AS completed,
		t.remarks, (select s.id from shops s where s.label = t.shop) as shop from idsLinkTemp i 
        left join `Material Shipper`.tags t on t.jobid = i.jobid 
        and t.DWGID = i.dwgid
        and t.mark = i.mark
        and t.tagid = i.tagid
        where `delete` != 1;


/*insert into addressjobTemp
select * from `ssi-business`.addressjobTemp;

delete from `ssi-business`.addressjobTemp;*/

insert into `ssi-business`.addressjobTemp (jobid,type)

select id,'Job' from `ssi-business`.jobs j;

insert into `ssi-business`.addressjobTemp (jobid,type)

select dwgid, 'Drawing' from `Material Shipper`.drawings where `delete` != 1;

insert into `ssi-business`.addressjobTemp (jobid,type)

select shipperid, 'Shipments' from `Material Shipper`.shipments where `delete` != 1;

/*insert into addresses
select * from `ssi-business`.addresses;

delete from `ssi-business`.addresses;*/
	
insert into `ssi-business`.addresses

select aj.addressesid,
	(SELECT CASE WHEN j.`address 2` is not null THEN concat(j.`address 1`,'\n',j.`address 2`) ELSE j.`address 1` END) , j.city, j.state, j.zip, j.country
from `Material Shipper`.jobs j right join addressjobTemp aj on j.JOBID = aj.jobid where aj.type = 'Job';

insert into `ssi-business`.addresses

select aj.addressesid,
	(SELECT CASE WHEN d.`ship to address 2` is not null THEN concat(d.`ship to address 1`,'\n',d.`ship to address 2`) ELSE d.`ship to address 1` END),
    d.`ship to city`, d.`ship to state`, d.`ship to zip`, d.`ship to country`
from `Material Shipper`.drawings d join addressjobTemp aj on d.dwgID = aj.jobid where aj.type = 'Drawing';

insert into `ssi-business`.addresses

select aj.addressesid,
	(SELECT CASE WHEN s.`ship to address 2` is not null THEN concat(s.`ship to address 1`,'\n',s.`ship to address 2`) ELSE s.`ship to address 1` END),
    s.`ship to city`, s.`ship to state`, s.`ship to zip`, s.`ship to country`
from `Material Shipper`.shipments s join addressjobTemp aj on s.shipperid = aj.jobid where aj.type = 'Shipments';


/*insert into job_addresses
select * from `ssi-business`.job_addresses;

delete from job_addresses;*/

insert into `ssi-business`.job_addresses (job_id, address_type, address_id)

select jobid, 'SHIPPING', addressesid from addressjobTemp where type = 'Job';

/*insert into shipping_requests
select * from `ssi-business`.shipping_requests;

delete from `ssi-business`.shipping_requests;*/

insert into `ssi-business`.shipping_requests 

SELECT dw.shipping_request_id,
    d.`tag type`, d.title, d.rev, d.`rev date`, d.`start date`, d.`shop date`, d.`field date`, 
	d.datereqd, d.REQUESTEDBY, d.PREPAREDBY, d.`file`,  
	(select id from shops where label = d.shop) as shopid,( select id from carriers where label = d.shipvia) as carrierid,
    (select c.id from contacts c right join contactjobTemp cj on c.id = cj.id where label = d.`ship to contact` and cj.jobid = d.dwgid) as contactid,
    (select addressesid from addressjobTemp where jobid = d.dwgid and type = 'Drawing') as addressid
FROM `Material Shipper`.drawings d 
right join dwgshipreqlinktemp dw
on dw.dwg_id = d.DWGID;

/*insert into specialty_items
select * from `ssi-business`.specialty_items;

delete from specialty_items;*/

insert specialty_items(label)

SELECT distinct (SELECT sc.partsection FROM `Material Shipper`.`specialty category` sc where sc.partsecid = d.partsecid) 
FROM `Material Shipper`.drawings d where d.specialtyitem > 0 and partsecid is not null;

/*insert into drawings
select * from `ssi-business`.drawings;

delete from drawings;*/

insert into `ssi-business`.drawings

SELECT draw.dwgid, draw.jobid, draw.dwg, draw.`dwg type`, 
(select si.id from specialty_items si where si.label = (select sc.partsection from `Material Shipper`.`specialty category` sc where sc.partsecid = draw.partsecid)) as partsecid, (select shipping_request_id from dwgshipreqlinktemp where dwg_id = draw.dwgid) 
FROM `Material Shipper`.drawings draw
where draw.`delete` != 1 
and draw.`dwg type` in ('DETAIL','LAYOUT','VOID')
and draw.dwg not like 'RMS%'
and draw.jobid in (select id from jobs)
and draw.dwgid not in (select min(dwgid) from `Material Shipper`.drawings d 
where concat(jobid,'-',dwg) in (select concat from (select count(concat(jobid,'-',dwg)) as count,concat(jobid,'-',dwg) as concat
from `Material Shipper`.drawings d where d.`DELETE` != 1 group by concat(jobid,'-',dwg) order by count(concat(jobid,'-',dwg)) desc
) as tab where count > 1) group by concat(jobid,'-',dwg) order by jobid, dwg);

/*insert into validtagTemp
select * from `ssi-business`.validtagTemp;

delete from `ssi-business`.validtagTemp;*/

insert into `ssi-business`.validtagTemp 

select max(tagid) as tagid
from `Material Shipper`.tags t 
where concat(dwgid,'-',mark) in (
	select concat 
    from (select count(concat(dwgid,'-',mark)) as count, concat(dwgid,'-',mark) as concat, dwg 
		  from `Material Shipper`.tags group by concat(dwgid,'-',mark) order by count(concat(dwgid,'-',mark)
          ) desc ) as tab where count > 1 ) group by concat(dwgid,'-',mark) order by dwgid, mark;

insert into `ssi-business`.validtagTemp 

select tagid from `Material Shipper`.tags t 
where concat(dwgid,'-',mark) in (
	select concat 
    from (select count(concat(dwgid,'-',mark)) as count, concat(dwgid,'-',mark) as concat, dwg 
		  from `Material Shipper`.tags group by concat(dwgid,'-',mark) order by count(concat(dwgid,'-',mark)
          ) desc ) as tab where count < 2 ) group by concat(dwgid,'-',mark) order by dwgid, mark;

/*insert into marks
select * from `ssi-business`.marks;

delete from `ssi-business`.marks;*/

insert into `ssi-business`.marks (drawing_id,label,shipping_item_id)

select i.dwgid, 
	mark, 
    i.shipping_items_id
from idslinktemp i
where i.dwgid in (select id from drawings) 
and i.mark not like 'RMS%'
AND i.shipping_items_id in (select id from shipping_items)
and tagid in (select id from validtagtemp);

/*insert into zones
select * from `ssi-business`.zones;

delete from `ssi-business`.zones;*/

insert into `ssi-business`.zones (job_id, number)

select * from(
	select distinct jobid, (select case 
				WHEN zone0 > 0
				then 0
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone1 > 0
				then 1
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone2 > 0
				then 2
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone3 > 0
				then 3
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone4 > 0
				then 4
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone5 > 0
				then 5
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone6 > 0
				then 6
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone7 > 0
				then 7
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone8 > 0
				then 8
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone9 > 0
				then 9
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone10 > 0
				then 10
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone11 > 0
				then 11
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone12 > 0
				then 12
			End)  as zone
	from `Material Shipper`.tags t
	union
	select distinct jobid, (select case 
				WHEN zone20 > 0
				then 20
			End)  as zone
	from `Material Shipper`.tags t
) as tab where jobid in (select id from jobs) and zone is not null;

/*insert into shipping_item_zones
select * from `ssi-business`.shipping_item_zones;

delete from `ssi-business`.shipping_item_zones;*/

insert into `ssi-business`.shipping_item_zones(shipping_item_id, zone_id, quantity)

select * from(

select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 0) as zone, t.zone0 as quantity from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone0 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 1) as zone, t.zone1 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone1 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 2) as zone, t.zone2 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone2 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 3) as zone, t.zone3 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone3 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 4) as zone, t.zone4 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone4 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 5) as zone, t.zone5 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone5 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 6) as zone, t.zone6 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone6 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 7) as zone, t.zone7 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone7 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 8) as zone, t.zone8 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone8 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 9) as zone, t.zone9 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone9 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 10) as zone, t.zone10 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone10 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 11) as zone, t.zone11 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone11 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 12) as zone, t.zone12 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone12 > 0
union all
select i.shipping_items_id, (select id from zones z where z.job_id = i.jobid and number = 20) as zone, t.zone20 from shipping_items s
left join idslinktemp i on s.id = i.shipping_items_id
left join `Material Shipper`.tags t on i.tagid = t.tagid and t.`delete` != 1
where i.shipping_items_id is not null
and t.zone20 > 0
) as tab where shipping_items_id in (select id from shipping_items) and zone is not null and quantity is not null and quantity > 0;

/*insert into shipping_groups
select * from `ssi-business`.shipping_groups;

delete from `ssi-business`.shipping_groups;*/

insert into `ssi-business`.shipping_groups(id,job_id, label, shipping_request_id)

SELECT draw.dwgid, draw.jobid, draw.dwg, (select shipping_request_id from dwgshipreqlinktemp where dwg_id = draw.dwgid) as shipping_request_id
FROM `Material Shipper`.drawings draw
where draw.`delete` != 1 
and draw.dwg like 'RMS%'
and draw.jobid in (select id from jobs)
and draw.dwgid not in (select min(dwgid) from `Material Shipper`.drawings d 
where concat(jobid,'-',dwg) in (select concat from (select count(concat(jobid,'-',dwg)) as count,concat(jobid,'-',dwg) as concat
from `Material Shipper`.drawings d where d.`DELETE` != 1 group by concat(jobid,'-',dwg) order by count(concat(jobid,'-',dwg)) desc
) as tab where count > 1) group by concat(jobid,'-',dwg) order by jobid, dwg);

/*insert into shipping_group_items
select * from `ssi-business`.shipping_group_items;

delete from `ssi-business`.shipping_group_items;*/

insert into `ssi-business`.shipping_group_items (shipping_group_id, shipping_item_id, label)

select i.dwgid as shipping_group_id, 
	i.shipping_items_id,
	i.mark
from idslinktemp i
where i.dwgid in (select id from shipping_groups)
and i.tagid in (select id from validtagtemp);

/*insert into validshipmenttemp
select * from `ssi-business`.validshippertemp;

delete from `ssi-business`.validshippertemp;*/

insert into `ssi-business`.validshippertemp

select max(shipperid) from `Material Shipper`.shipments 
where concat(jobid,'-',shipment) in (select concat from (
	select concat(jobid,'-',shipment) as concat, count(concat(jobid,'-',shipment)) as count 
	from `Material Shipper`.shipments 
    where `delete` != 1 
    group by concat(jobid,'-',shipment) 
    order by count(concat(jobid,'-',shipment)) desc) as tab 
where count > 1) group by concat(jobid,'-',shipment);

insert into `ssi-business`.validshippertemp

select shipperid from `Material Shipper`.shipments 
where concat(jobid,'-',shipment) in (select concat from (
	select concat(jobid,'-',shipment) as concat, count(concat(jobid,'-',shipment)) as count 
	from `Material Shipper`.shipments 
    where `delete` != 1 
    group by concat(jobid,'-',shipment) 
    order by count(concat(jobid,'-',shipment)) desc) as tab 
where count < 2) group by concat(jobid,'-',shipment);


/*insert into shipments
select * from `ssi-business`.shipments;

delete from `ssi-business`.shipments;*/

insert into `ssi-business`.shipments

select s.shipperid, s.jobid, 
	s.shipment, 
	(select case when s.`delete` = 1 then 'DELETED'
				 when s.`posted` = 1 then 'POSTED'
				 else 'ACTIVE'
				 end) as status,
	(select id from shops where label = s.`ship from`) as shopid,
	(select id from carriers where label = s.`ship via`) as carrierid,
	(select case when s.weight is null then 0
				 else s.weight
				 end) as weight,
	s.`bill of lading`,
	s.`date`,
    (select cj.id from `ssi-business`.contactjobTemp cj where cj.jobid = s.shipperid and cj.type = 'Shipments') AS contactId,
	(select addressesid from addressjobTemp where jobid = s.shipperid and type = 'Shipments') as addressid
from `Material Shipper`.shipments s
where jobid in (select id from jobs) and `delete` != 1 and s.shipperid in (select id from validshippertemp);

/*insert into shipment_items
select * from `ssi-business`.shipment_items;

delete from `ssi-business`.shipment_items;*/

insert into `ssi-business`.shipment_items (shipping_item_id, shipment_id, quantity)

select distinct * from (
		SELECT (select shipping_items_id from idslinktemp i where tagid = sd.tagid) as shipping_item_id ,
				s.shipperid, 
				sd.`qty shpd` 
		FROM `Material Shipper`.shipments s
		left join  `Material Shipper`.`shipment details` sd 
		on s.SHIPPERID = sd.SHIPPERID
        where s.`DELETE` != 1 
        and sd.`DELETE` != 1 
        and s.shipperid is not null 
		and s.shipperid in (select id from `ssi-business`.shipments)
        and sd.`QTY SHPD` is not null 
		and sd.`QTY SHPD` >= 0
) as tab 
where shipping_item_id is not null 
and shipping_item_id in (select id from `ssi-business`.shipping_items);

/*insert into parts
select * from `ssi-business`.parts;

delete from `ssi-business`.parts;*/

/* 
insert into `ssi-business`.parts(type, number, description)

SELECT `part type`, `part no`, `part description` FROM `Material Shipper`.abm
where (`part no` is not null or `part description` is not null);
*/ 

/*insert into part_orders
select * from `ssi-business`.part_orders;

delete from `ssi-business`.part_orders;*/

insert into `ssi-business`.part_orders(job_id,abm_number, status, part_type, part_number, part_description, manufacturer_id,vendor_id,po,requested_quantity,stock_quantity,
purchase_quantity,request_date,purchase_date,release_date,released_by)

SELECT a.jobid,
a.abm,
(SELECT CASE WHEN a.`delete` != 1 THEN 'ACTIVE' ELSE 'DELETED' END) AS status,
a.`PART TYPE` as part_type,
a.`PART NO` as part_number,
a.`PART DESCRIPTION` as part_description,
(select m.id from manufacturers m where m.label = a.manufacturer) as manufid,
(select v.id from vendors v where v.label = a.vendor) as vendorid,
a.po,
a.`abm qty`,
a.`stock qty`,
a.`purch qty`,
a.`req'd date`,
a.`purch date`,
a.`release date`,
a.`released by`
FROM `Material Shipper`.abm a;

/* system type etl */
insert into `ssi-business`.system_types (label)
SELECT 
    `system type` AS label
FROM
    `material shipper`.`system type`
WHERE
    TRIM(`system type`) NOT IN ('NONE' , '');

/* handle unexpected system types in jobs */
insert into `ssi-business`.system_types (label)
SELECT DISTINCT
    `system type` as label
FROM
    `material shipper`.jobs
WHERE
    TRIM(`system type`) NOT IN ('NONE' , '')
        AND TRIM(`system type`) NOT IN (SELECT 
            label
        FROM
            `ssi-business`.system_types);

/* handle system type 2 (current data shows about 430 out of ~13000 not 'NONE', NULL, or '') */
INSERT INTO `ssi-business`.job_system_types (job_id, system_type_id)
SELECT 
    sbj.id, sbst.id
FROM
    `material shipper`.jobs msj
        RIGHT JOIN
    `ssi-business`.system_types sbst ON msj.`system type` = sbst.label
        RIGHT JOIN
    `ssi-business`.jobs sbj ON jobid = sbj.id
WHERE
    msj.`system type` IN (SELECT 
            label
        FROM
            `ssi-business`.system_types);

/* handle system type 2 (current data shows all 'NONE', NULL, or '') */
INSERT INTO `ssi-business`.job_system_types (job_id, system_type_id)
SELECT 
    sbj.id, sbst.id
FROM
    `material shipper`.jobs msj
        RIGHT JOIN
    `ssi-business`.system_types sbst ON msj.`system type 2` = sbst.label
        RIGHT JOIN
    `ssi-business`.jobs sbj ON jobid = sbj.id
WHERE
    msj.`system type 2` IN (SELECT 
            label
        FROM
            `ssi-business`.system_types);

/* use to find non-conformant system types for manual entry */
/*
SELECT 
    jobid, `system type`
FROM
    `material shipper`.jobs
WHERE
    TRIM(`system type`) NOT IN ('NONE' , '')
        AND TRIM(`system type`) NOT IN (SELECT 
            label
        FROM
            `ssi-business`.system_types);
*/



/*
drop table addressjobtemp;
drop table contactjobtemp;
drop table dwgshipreqlinktemp;
drop table idslinktemp;
drop table validshippertemp;
drop table validtagtemp;
*/