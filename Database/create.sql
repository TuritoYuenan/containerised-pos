CREATE TABLE IF NOT EXISTS public.tiers
(
    tierid integer NOT NULL,
    tiername character varying(255) COLLATE pg_catalog."default" NOT NULL,
    pointsthreshold integer NOT NULL,
    benefitsdescription text COLLATE pg_catalog."default",
    CONSTRAINT tier_pkey PRIMARY KEY (tierid)
);

CREATE TABLE IF NOT EXISTS public.inventories
(
    inventoryid character varying COLLATE pg_catalog."default" NOT NULL,
    location character varying COLLATE pg_catalog."default" NOT NULL,
    updatelog jsonb,
    lastupdated timestamp without time zone,
    partitionkey character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT inventory_pkey PRIMARY KEY (inventoryid, partitionkey)
);

CREATE TABLE IF NOT EXISTS public.vendors
(
    vendorid character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    personalemail character varying(255) COLLATE pg_catalog."default",
    companyemail character varying(255) COLLATE pg_catalog."default" NOT NULL,
    personalphone character varying(20) COLLATE pg_catalog."default",
    workphone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    vendortype character varying(50) COLLATE pg_catalog."default" NOT NULL,
    createdate timestamp without time zone DEFAULT now(),
    lastupdate timestamp without time zone DEFAULT now(),
    description text COLLATE pg_catalog."default",
    CONSTRAINT vendor_pkey PRIMARY KEY (vendorid)
);

CREATE TABLE IF NOT EXISTS public.roles
(
    roleid serial NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT role_pkey PRIMARY KEY (roleid),
    CONSTRAINT role_name_key UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.purchasestransaction
(
    transactionid character varying COLLATE pg_catalog."default" NOT NULL,
    vendorid character varying COLLATE pg_catalog."default" REFERENCES public.vendors(vendorid),
    inventoryid character varying COLLATE pg_catalog."default" NOT NULL,
    partitionkey character varying COLLATE pg_catalog."default" NOT NULL,
    totalpayment numeric NOT NULL,
    purchasedate timestamp without time zone NOT NULL,
    paymentstatus character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT purchasetransaction_pkey PRIMARY KEY (transactionid),
    CONSTRAINT inventory_partition_fk FOREIGN KEY (inventoryid, partitionkey) REFERENCES public.inventories(inventoryid, partitionkey)
);

CREATE TABLE IF NOT EXISTS public.employees
(
    employeeid character varying(50) COLLATE pg_catalog."default" NOT NULL,
    roleid integer REFERENCES public.roles(roleid),
    lastname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    firstname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(255) COLLATE pg_catalog."default" CHECK (gender IN ('male', 'female')),
    dateofbirth date NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phonenumber character varying(15) COLLATE pg_catalog."default" NOT NULL,
    hiredate date NOT NULL DEFAULT CURRENT_DATE,
    accesslevel integer CHECK (accesslevel BETWEEN 1 AND 5),
    managerid character varying(50) COLLATE pg_catalog."default" REFERENCES public.employees(employeeid),
    shiftlist character varying[] COLLATE pg_catalog."default",
    status character varying(50) COLLATE pg_catalog."default" DEFAULT 'Onboarding' CHECK (status IN ('Onboarding', 'Active', 'On Leave', 'Probationary', 'Part-time/Temporary', 'Retired', 'Transferred', 'Resigned', 'Terminated')),
    CONSTRAINT employee_pkey PRIMARY KEY (employeeid)
);

CREATE TABLE IF NOT EXISTS public.customers
(
    customerid character varying(50) COLLATE pg_catalog."default" NOT NULL,
    firstname character varying(255) COLLATE pg_catalog."default",
    lastname character varying(255) COLLATE pg_catalog."default",
    gender character varying(255) COLLATE pg_catalog."default" CHECK (gender IN ('male', 'female')),
    dateofbirth date NOT NULL,
    email character varying COLLATE pg_catalog."default",
    phonenumber character varying(16) COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default",
    datejoined date DEFAULT CURRENT_DATE,
    currenttierid integer REFERENCES public.tiers(tierid),
    tierdateachieved date DEFAULT CURRENT_DATE,
    pointsearned integer DEFAULT 0,
    rewardsclaimed jsonb DEFAULT '[]'::jsonb,
    tierhistory jsonb DEFAULT '[]'::jsonb,
    CONSTRAINT customer_pkey PRIMARY KEY (customerid)
);

CREATE TABLE IF NOT EXISTS public.customerorders
(
    orderid character varying COLLATE pg_catalog."default" NOT NULL,
    customerid character varying COLLATE pg_catalog."default" REFERENCES public.customers(customerid),
    employeeid character varying COLLATE pg_catalog."default" REFERENCES public.employees(employeeid),
    orderdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying COLLATE pg_catalog."default" DEFAULT 'Pending' CHECK (status IN ('Pending', 'Paid', 'Making', 'Finished')),
    ordertype character varying COLLATE pg_catalog."default" CHECK (ordertype IN ('Dine-in', 'Take-out', 'Delivery')),
    orderplace character varying COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default",
    CONSTRAINT customerorder_pkey PRIMARY KEY (orderid)
);

CREATE TABLE IF NOT EXISTS public.ingredients
(
    ingredientid numeric NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    type character varying(50) COLLATE pg_catalog."default" NOT NULL CHECK (type IN ('meat', 'fish', 'herb', 'spice', 'dairy', 'grain', 'vegetable', 'fruit')),
    measureunit character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT ingredient_pkey PRIMARY KEY (ingredientid)
);

CREATE TABLE IF NOT EXISTS public.inventoryingredients
(
    storageid character varying COLLATE pg_catalog."default" NOT NULL,
    partitionkey character varying COLLATE pg_catalog."default" NOT NULL,
    ingredientid numeric NOT NULL REFERENCES public.ingredients(ingredientid),
    quantity integer NOT NULL,
    supplyrequest boolean DEFAULT FALSE,
    lastupdated timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT inventoryingredient_pkey PRIMARY KEY (storageid, partitionkey, ingredientid)
);

CREATE TABLE IF NOT EXISTS public.purchasedingredients
(
    ingredientpurchaseid character varying COLLATE pg_catalog."default" NOT NULL,
    transactionid character varying COLLATE pg_catalog."default" NOT NULL REFERENCES public.purchasestransaction(transactionid),
    ingredientid numeric REFERENCES public.ingredients(ingredientid),
    quantitypurchased integer NOT NULL,
    purchaseprice numeric NOT NULL,
    storageid character varying COLLATE pg_catalog."default" NOT NULL,
    partitionkey character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT ingredientpurchase_pkey PRIMARY KEY (ingredientpurchaseid),
    CONSTRAINT storage_partition_fk FOREIGN KEY (storageid, partitionkey) REFERENCES public.inventories(inventoryid, partitionkey)
);

CREATE TABLE IF NOT EXISTS public.items
(
    itemid character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    itemimage character varying COLLATE pg_catalog."default",
    category character varying COLLATE pg_catalog."default",
    CONSTRAINT item_pkey PRIMARY KEY (itemid)
);

CREATE TABLE IF NOT EXISTS public.itemingredients
(
    itemid character varying COLLATE pg_catalog."default" NOT NULL REFERENCES public.items(itemid),
    ingredientid numeric NOT NULL REFERENCES public.ingredients(ingredientid),
    quantity numeric NOT NULL,
    CONSTRAINT itemingredient_pkey PRIMARY KEY (itemid, ingredientid)
);

CREATE TABLE IF NOT EXISTS public.menuitems
(
    itemid character varying COLLATE pg_catalog."default" NOT NULL,
    itemdescription text COLLATE pg_catalog."default",
    price numeric NOT NULL,
    discount numeric DEFAULT 0,
    status character varying COLLATE pg_catalog."default" DEFAULT 'Unavailable' CHECK (status IN ('Available', 'Unavailable')),
    availablesince timestamp without time zone,
    availableuntil timestamp without time zone,
    nutritionalinfo text COLLATE pg_catalog."default",
    CONSTRAINT menu_pkey PRIMARY KEY (itemid)
);

CREATE TABLE IF NOT EXISTS public.orderitems
(
    orderitemid character varying COLLATE pg_catalog."default" NOT NULL,
    orderid character varying COLLATE pg_catalog."default" NOT NULL REFERENCES public.customerorders(orderid),
    itemid character varying COLLATE pg_catalog."default" REFERENCES public.items(itemid),
    quantity integer DEFAULT 1,
    status character varying COLLATE pg_catalog."default" DEFAULT 'Pending' CHECK (status IN ('Pending', 'Making', 'Finished', 'Canceled')),
    displayonkdf boolean DEFAULT true,
    price numeric NOT NULL,
    notes text COLLATE pg_catalog."default",
    CONSTRAINT orderitem_pkey PRIMARY KEY (orderitemid)
);

CREATE TABLE IF NOT EXISTS public.payments
(
    paymentid character varying COLLATE pg_catalog."default" NOT NULL,
    orderid character varying COLLATE pg_catalog."default" NOT NULL,
    customerid character varying COLLATE pg_catalog."default" REFERENCES public.customers(customerid),
    amount numeric NOT NULL,
    paymentmethod character varying COLLATE pg_catalog."default" NOT NULL,
    status character varying COLLATE pg_catalog."default" NOT NULL,
    paymentday date DEFAULT CURRENT_DATE,
    CONSTRAINT payment_pkey PRIMARY KEY (orderid, paymentid),
    CONSTRAINT payment_paymentid_key UNIQUE (paymentid)
);

CREATE TABLE IF NOT EXISTS public.rewards
(
    rewardid integer NOT NULL,
    rewardname character varying COLLATE pg_catalog."default" NOT NULL,
    pointsrequired integer NOT NULL,
    description text COLLATE pg_catalog."default",
    expirationdate date,
    CONSTRAINT reward_pkey PRIMARY KEY (rewardid)
);

CREATE TABLE IF NOT EXISTS public.shifts
(
    shiftid character varying(50) COLLATE pg_catalog."default" NOT NULL,
    dayofweek character varying(10) COLLATE pg_catalog."default" NOT NULL,
    starttime time without time zone NOT NULL,
    endtime time without time zone NOT NULL,
    CONSTRAINT shift_pkey PRIMARY KEY (shiftid)
);

CREATE TABLE IF NOT EXISTS public.timetracks
(
    employeeid character varying COLLATE pg_catalog."default" NOT NULL,
    shiftid character varying COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    clockintime timestamp without time zone NOT NULL,
    clockouttime timestamp without time zone NOT NULL,
    hoursworked numeric,
    breaks interval DEFAULT '00:00:00'::interval,
    overtime boolean DEFAULT false,
    comments text COLLATE pg_catalog."default",
    status character varying(20) COLLATE pg_catalog."default" DEFAULT 'absent' CHECK (status IN ('absent', 'present', 'late', 'on leave')),
    CONSTRAINT timetracking_pkey PRIMARY KEY (employeeid, shiftid, date)
);
