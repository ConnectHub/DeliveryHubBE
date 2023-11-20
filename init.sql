--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: username
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'TRUSTEE',
    'DOORMAN'
);


ALTER TYPE public."Role" OWNER TO username;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: username
--

CREATE TYPE public."Status" AS ENUM (
    'PENDING',
    'DELIVERED',
    'CANCELED'
);


ALTER TYPE public."Status" OWNER TO username;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Condominium; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public."Condominium" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Condominium" OWNER TO username;

--
-- Name: InboxMessageErrors; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public."InboxMessageErrors" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    message text NOT NULL,
    error text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."InboxMessageErrors" OWNER TO username;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    url text NOT NULL,
    code text NOT NULL,
    img text,
    description text,
    "trackingCode" text,
    status public."Status" DEFAULT 'PENDING'::public."Status" NOT NULL,
    sender text,
    sign text,
    "signDateHour" timestamp(3) without time zone,
    "receiptDateHour" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "addresseeId" text NOT NULL,
    "condominiumId" text NOT NULL
);


ALTER TABLE public."Order" OWNER TO username;

--
-- Name: Resident; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public."Resident" (
    id text NOT NULL,
    name text NOT NULL,
    "buildingApartment" text NOT NULL,
    "phoneNumber" text NOT NULL,
    email text,
    "condominiumId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Resident" OWNER TO username;

--
-- Name: User; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public."User" (
    id text NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    roles public."Role"[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "condominiumId" text NOT NULL,
    "rateId" text
);


ALTER TABLE public."User" OWNER TO username;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO username;

--
-- Name: rate; Type: TABLE; Schema: public; Owner: username
--

CREATE TABLE public.rate (
    id text NOT NULL,
    value integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public.rate OWNER TO username;

--
-- Data for Name: Condominium; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."Condominium" (id, name, "createdAt", "updatedAt", "deletedAt") FROM stdin;
abdd917f-ef24-4fc2-a622-b7eaddbdbfb3	COND TEST 1	2023-11-20 18:25:02.886	2023-11-20 18:25:02.886	\N
d21dae87-4987-4b71-9b45-04f70b28f382	COND DAS PALMEIRAS	2023-11-20 18:25:02.886	2023-11-20 18:25:02.886	\N
\.


--
-- Data for Name: InboxMessageErrors; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."InboxMessageErrors" (id, "orderId", message, error, "createdAt", "updatedAt", "deletedAt") FROM stdin;
4bfbba56-3622-49ba-8777-56ee6cc042b8	clp7bwvy10003tdee0br4h9r2	5581983143341@c.us	{}	2023-11-20 19:57:58.15	2023-11-20 19:57:58.15	\N
cf074410-69dd-48c0-8d93-0648b5c9ded2	clp7bwvy10003tdee0br4h9r2	5581983143341@c.us	{}	2023-11-20 19:57:58.214	2023-11-20 19:57:58.214	\N
7b3695d1-b181-492d-a4fc-0fb54da0db91	clp7bwvy10003tdee0br4h9r2	5581983143341@c.us	{}	2023-11-20 19:57:58.275	2023-11-20 19:57:58.275	\N
12e0a788-1c37-4127-b251-aae5364e4ba2	clp7bx0230005tdeequp5ngxc	5581983143341@c.us	{}	2023-11-20 19:58:03.18	2023-11-20 19:58:03.18	\N
22378c00-c8db-4c92-b8c9-18aeac02ae62	clp7bx0230005tdeequp5ngxc	5581983143341@c.us	{}	2023-11-20 19:58:03.189	2023-11-20 19:58:03.189	\N
da0869db-b6ad-4824-9efe-3a7e9374b37c	clp7bx0230005tdeequp5ngxc	5581983143341@c.us	{}	2023-11-20 19:58:03.197	2023-11-20 19:58:03.197	\N
66022d02-f4b6-4bf7-a122-72cb646fdec8	clp7bx18d0007tdeedhqbb83y	5581983143341@c.us	{}	2023-11-20 19:58:04.688	2023-11-20 19:58:04.688	\N
e09601cb-a2f6-4f06-aeb7-dbffe99271e4	clp7bx18d0007tdeedhqbb83y	5581983143341@c.us	{}	2023-11-20 19:58:04.7	2023-11-20 19:58:04.7	\N
20f9dfc0-ca97-4806-8d7d-3ea6698865b0	clp7bx18d0007tdeedhqbb83y	5581983143341@c.us	{}	2023-11-20 19:58:04.711	2023-11-20 19:58:04.711	\N
c93df54a-94b8-4ce7-9256-de09d1f78549	clp7bx2fm0009tdeep7ptfuub	5581983143341@c.us	{}	2023-11-20 19:58:06.246	2023-11-20 19:58:06.246	\N
376d41cd-e800-41e6-a9e8-d45dd853b700	clp7bx2fm0009tdeep7ptfuub	5581983143341@c.us	{}	2023-11-20 19:58:06.259	2023-11-20 19:58:06.259	\N
05dc0cb0-7178-49ca-934c-7fcb63b68d43	clp7bx2fm0009tdeep7ptfuub	5581983143341@c.us	{}	2023-11-20 19:58:06.272	2023-11-20 19:58:06.272	\N
c1d1e588-3627-4d73-8596-934652cea701	clp7bx52z000btdeeo3yx3btt	5581983143341@c.us	{}	2023-11-20 19:58:09.674	2023-11-20 19:58:09.674	\N
0a8ecccf-fbb4-49db-a43d-3cea6e20da25	clp7bx52z000btdeeo3yx3btt	5581983143341@c.us	{}	2023-11-20 19:58:09.698	2023-11-20 19:58:09.698	\N
98e94033-1780-45dc-bcfb-e9b1514c70b8	clp7bx52z000btdeeo3yx3btt	5581983143341@c.us	{}	2023-11-20 19:58:09.68	2023-11-20 19:58:09.68	\N
94b7ac8f-a929-4016-b2f1-bb6a76424440	clp7bxxg3000dtdeefxdcx9ha	5581932342341@c.us	{}	2023-11-20 19:58:46.448	2023-11-20 19:58:46.448	\N
e728bf04-a0f5-4a5f-941f-03838b27bb7b	clp7bxxg3000dtdeefxdcx9ha	5581932342341@c.us	{}	2023-11-20 19:58:46.466	2023-11-20 19:58:46.466	\N
b2f2badd-7ee7-4ca3-a045-4ba40e8ab0cb	clp7bxxg3000dtdeefxdcx9ha	5581932342341@c.us	{}	2023-11-20 19:58:46.47	2023-11-20 19:58:46.47	\N
3e12deb4-0f05-4f50-b837-40fa170826f3	clp7by0hh000ftdee1w70r8ba	5581932342341@c.us	{}	2023-11-20 19:58:50.38	2023-11-20 19:58:50.38	\N
13fd90fc-b74c-4db7-96bd-037ce5ceb1aa	clp7by0hh000ftdee1w70r8ba	5581932342341@c.us	{}	2023-11-20 19:58:50.387	2023-11-20 19:58:50.387	\N
686ed749-2f68-462d-8ecd-b24c4b8f433d	clp7by0hh000ftdee1w70r8ba	5581932342341@c.us	{}	2023-11-20 19:58:50.394	2023-11-20 19:58:50.394	\N
d4ebd1a4-a7b6-4548-bd83-4ec8afece49f	clp7by52l000htdeevcud1byw	5581932342341@c.us	{}	2023-11-20 19:58:56.331	2023-11-20 19:58:56.331	\N
d0248657-3d99-4056-9b3d-606870361d2a	clp7by52l000htdeevcud1byw	5581932342341@c.us	{}	2023-11-20 19:58:56.336	2023-11-20 19:58:56.336	\N
90b84734-2778-493a-9d4d-7d03422f016e	clp7by52l000htdeevcud1byw	5581932342341@c.us	{}	2023-11-20 19:58:56.346	2023-11-20 19:58:56.346	\N
57c3f50a-a70b-4262-8580-e2f862b14899	clp7c9zw4000jtdeepfeb69qa	5581912343341@c.us	{}	2023-11-20 20:08:09.649	2023-11-20 20:08:09.649	\N
a25a9142-95f9-468d-8c71-47dbc1322c33	clp7c9zw4000jtdeepfeb69qa	5581912343341@c.us	{}	2023-11-20 20:08:09.672	2023-11-20 20:08:09.672	\N
8ff41874-8e6d-4c6a-b2b2-b7c43edc20ca	clp7c9zw4000jtdeepfeb69qa	5581912343341@c.us	{}	2023-11-20 20:08:09.691	2023-11-20 20:08:09.691	\N
b014fb18-4424-4ded-8f0a-cff06bc9c72c	clp7ca9zn000ltdee33y012fz	5581912343341@c.us	{}	2023-11-20 20:08:22.612	2023-11-20 20:08:22.612	\N
f94a1af0-6d0d-4b35-bce2-ed7534a938bb	clp7ca9zn000ltdee33y012fz	5581912343341@c.us	{}	2023-11-20 20:08:22.618	2023-11-20 20:08:22.618	\N
a9e8d6ab-70b4-4e85-a85f-51426045eb6c	clp7ca9zn000ltdee33y012fz	5581912343341@c.us	{}	2023-11-20 20:08:22.634	2023-11-20 20:08:22.634	\N
56bc22d7-af07-4953-9cf4-d01575d39582	clp7cd2el000ntdee6sh3o3q3	5581987032341@c.us	{}	2023-11-20 20:10:32.751	2023-11-20 20:10:32.751	\N
cdd5d531-4ef1-487f-a8e7-9f8e95edc827	clp7cd2el000ntdee6sh3o3q3	5581987032341@c.us	{}	2023-11-20 20:10:32.804	2023-11-20 20:10:32.804	\N
7b2b2dfd-bd17-46cb-b58f-52d279ff609c	clp7cd2el000ntdee6sh3o3q3	5581987032341@c.us	{}	2023-11-20 20:10:32.773	2023-11-20 20:10:32.773	\N
13829af9-60cf-43a6-8767-547359115315	clp7cd7yj000ptdeedrs1xstx	5581987032341@c.us	{}	2023-11-20 20:10:39.929	2023-11-20 20:10:39.929	\N
c3927478-baa2-42c4-87b7-1a3053f9b35f	clp7cd7yj000ptdeedrs1xstx	5581987032341@c.us	{}	2023-11-20 20:10:39.934	2023-11-20 20:10:39.934	\N
613c2029-3e37-4b1d-86ac-ddb53debcd48	clp7cd7yj000ptdeedrs1xstx	5581987032341@c.us	{}	2023-11-20 20:10:39.943	2023-11-20 20:10:39.943	\N
8ebedd0c-9b8e-41bc-bd6f-32e676027917	clp7cdg32000rtdeeai7uboow	5581987032341@c.us	{}	2023-11-20 20:10:50.426	2023-11-20 20:10:50.426	\N
cceee458-6e17-457d-87f6-c446cf868580	clp7cdg32000rtdeeai7uboow	5581987032341@c.us	{}	2023-11-20 20:10:50.436	2023-11-20 20:10:50.436	\N
04de31c9-c4dd-4763-9844-19ef004ab78d	clp7cdg32000rtdeeai7uboow	5581987032341@c.us	{}	2023-11-20 20:10:50.448	2023-11-20 20:10:50.448	\N
32717fac-a4e4-4cae-a077-84b05cd89e7c	clp7cfqo8000ttdeekgdv7jcm	5581982323341@c.us	{}	2023-11-20 20:12:37.725	2023-11-20 20:12:37.725	\N
6873d178-e68d-43cc-9168-cba3498602a6	clp7cfqo8000ttdeekgdv7jcm	5581982323341@c.us	{}	2023-11-20 20:12:37.733	2023-11-20 20:12:37.733	\N
edc2c08b-005a-4937-bf85-cfdd8ae8d491	clp7cfqo8000ttdeekgdv7jcm	5581982323341@c.us	{}	2023-11-20 20:12:37.81	2023-11-20 20:12:37.81	\N
2c4ebc15-98e0-403d-a451-8af1a819f125	clp7cg1ok000vtdeeijl2lepm	5581982323341@c.us	{}	2023-11-20 20:12:51.755	2023-11-20 20:12:51.755	\N
b3bfb093-72b9-4c17-bd1f-f0d41b33c4e2	clp7cg1ok000vtdeeijl2lepm	5581982323341@c.us	{}	2023-11-20 20:12:51.766	2023-11-20 20:12:51.766	\N
03947ce5-edb8-41fb-9eca-f8c1e9a311fa	clp7cg1ok000vtdeeijl2lepm	5581982323341@c.us	{}	2023-11-20 20:12:51.778	2023-11-20 20:12:51.778	\N
443d8183-248f-4616-b6aa-2ad93f04333e	clp7cgjpl000xtdee1ns4nxa4	5581987032341@c.us	{}	2023-11-20 20:13:15.096	2023-11-20 20:13:15.096	\N
b927ee50-1911-44d0-a10f-482895db8ce6	clp7cgjpl000xtdee1ns4nxa4	5581987032341@c.us	{}	2023-11-20 20:13:15.245	2023-11-20 20:13:15.245	\N
17f906c4-03c1-41f6-b4aa-b994a9e30c72	clp7cgjpl000xtdee1ns4nxa4	5581987032341@c.us	{}	2023-11-20 20:13:15.255	2023-11-20 20:13:15.255	\N
93cc1155-ad9f-454c-b0f3-f35bd62fa948	clp7cgv29000ztdeepv7c7g0b	5581987032341@c.us	{}	2023-11-20 20:13:29.81	2023-11-20 20:13:29.81	\N
bceddec2-7438-4423-856a-84ad26331a7a	clp7cgv29000ztdeepv7c7g0b	5581987032341@c.us	{}	2023-11-20 20:13:29.821	2023-11-20 20:13:29.821	\N
15fc67bd-e601-42bb-ae20-5bb4fad6d8be	clp7cgv29000ztdeepv7c7g0b	5581987032341@c.us	{}	2023-11-20 20:13:29.878	2023-11-20 20:13:29.878	\N
c922f0d8-c9b1-4e61-8a1c-eed37a7ad360	clp7cgylp0011tdeez6ozfzyt	5581987032341@c.us	{}	2023-11-20 20:13:34.398	2023-11-20 20:13:34.398	\N
d2238cb1-7650-4c19-9a43-396858125cbf	clp7cgylp0011tdeez6ozfzyt	5581987032341@c.us	{}	2023-11-20 20:13:34.409	2023-11-20 20:13:34.409	\N
a4f0a17f-554f-4ef7-bbfb-6e9d668fe027	clp7cgylp0011tdeez6ozfzyt	5581987032341@c.us	{}	2023-11-20 20:13:34.413	2023-11-20 20:13:34.413	\N
ba04de9d-631d-4a36-8583-7de9d122a11c	clp7chfza0013tdeedz62b6yy	5581987032341@c.us	{}	2023-11-20 20:13:57.022	2023-11-20 20:13:57.022	\N
685a387a-8e78-48ff-ae29-0da849751579	clp7chfza0013tdeedz62b6yy	5581987032341@c.us	{}	2023-11-20 20:13:57.138	2023-11-20 20:13:57.138	\N
5358af5f-da22-4e89-ab96-e96fd97dc1b4	clp7chfza0013tdeedz62b6yy	5581987032341@c.us	{}	2023-11-20 20:13:57.069	2023-11-20 20:13:57.069	\N
4690174a-faa4-49ea-b6e1-c31254e3cc74	clp7chhzi0015tdeeu6p0r4ai	5581987032341@c.us	{}	2023-11-20 20:13:59.519	2023-11-20 20:13:59.519	\N
beeed410-e833-4fa7-9795-37a341a12372	clp7chhzi0015tdeeu6p0r4ai	5581987032341@c.us	{}	2023-11-20 20:13:59.528	2023-11-20 20:13:59.528	\N
a037d69d-1e68-4422-9e9b-9f752de9216c	clp7chhzi0015tdeeu6p0r4ai	5581987032341@c.us	{}	2023-11-20 20:13:59.531	2023-11-20 20:13:59.531	\N
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."Order" (id, url, code, img, description, "trackingCode", status, sender, sign, "signDateHour", "receiptDateHour", "updatedAt", "deletedAt", "addresseeId", "condominiumId") FROM stdin;
e7ec2d25-5c15-4475-95cf-5e1eb1cfd906	clp7bwvy10003tdee0br4h9r2	x9uf3c	https://tsttst.s3.amazonaws.com/30bd40cc-b75f-4803-b2f2-ef2ad730cf38.jpeg	A unique package	00000	PENDING	Amazon	\N	\N	2023-11-20 19:57:57.802	2023-11-20 20:06:24.46	\N	48cb8d7b-208d-421c-ba43-a941daae0a5f	d21dae87-4987-4b71-9b45-04f70b28f382
e6560169-d8b9-4f2b-bb79-786431ecfe9e	clp7by0hh000ftdee1w70r8ba	sk9mzi	https://tsttst.s3.amazonaws.com/303b2409-7e14-4a26-97e1-8f596ed2842b.jpeg	A letter	00000	PENDING	Correios	\N	\N	2023-11-20 19:58:50.357	2023-11-20 20:06:24.46	\N	540f7cf6-b2bf-4340-a49e-67a39335f1c2	d21dae87-4987-4b71-9b45-04f70b28f382
076a9a61-a173-4679-b298-6e3647353934	clp7cfqo8000ttdeekgdv7jcm	o5ff7p	https://tsttst.s3.amazonaws.com/b5410e5a-38bd-4012-afda-cbcf5d0e69d0.jpeg	A letter with a lipstick brand	00000	PENDING	Amazon	\N	\N	2023-01-20 20:12:37.448	2023-11-20 20:16:23.461	\N	b5e35d45-3a97-4b05-810b-11565dc63879	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
15ec88ff-115f-428b-a7d7-02a024bacc01	clp7cgylp0011tdeez6ozfzyt	mn7fbi	https://tsttst.s3.amazonaws.com/a9fbb056-a5a4-456a-a296-697555cdd778.jpeg	A crown	00000	PENDING	Amazon	\N	\N	2023-01-20 20:13:34.381	2023-11-20 20:16:23.461	\N	cca7ad10-9a7f-4f7b-8e9d-6777725caef5	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
16af9c18-0327-4a88-a4bd-64ff52cf9002	clp7bx0230005tdeequp5ngxc	x2r6nr	https://tsttst.s3.amazonaws.com/de081f42-f46f-452a-895d-b21c949390f2.jpeg	A small package	00000	PENDING	Amazon	\N	\N	2023-01-20 19:58:03.147	2023-11-20 20:16:23.461	\N	48cb8d7b-208d-421c-ba43-a941daae0a5f	d21dae87-4987-4b71-9b45-04f70b28f382
f0a21521-0dbc-41c2-a0a5-7901bc6d7bb5	clp7c9zw4000jtdeepfeb69qa	tocepl	https://tsttst.s3.amazonaws.com/f3a13b15-5719-49d5-89f5-92f00ce1e127.jpeg	A big package	00000	PENDING	Amazon	\N	\N	2023-12-20 20:08:09.359	2023-11-20 20:16:23.461	\N	de60559c-2d61-4b2b-be48-149915c1ab96	d21dae87-4987-4b71-9b45-04f70b28f382
da0652f4-59c8-40ca-a287-c863637695ec	clp7bx2fm0009tdeep7ptfuub	ou0lcl	https://tsttst.s3.amazonaws.com/a934eb81-9744-474c-ae89-04d0cd28e2d9.jpeg	A letter	00000	PENDING	Amazon	\N	\N	2023-10-20 19:58:06.227	2023-11-20 20:16:23.461	\N	48cb8d7b-208d-421c-ba43-a941daae0a5f	d21dae87-4987-4b71-9b45-04f70b28f382
b482de9a-d4fe-4905-8df3-0fa0b7094b51	clp7bx52z000btdeeo3yx3btt	xvb56u	https://tsttst.s3.amazonaws.com/a6a23ab6-15c1-48ad-b59c-53225a44cdaf.jpeg	A big package	00000	PENDING	Correios	\N	\N	2023-09-20 19:58:09.659	2023-11-20 20:16:23.461	\N	48cb8d7b-208d-421c-ba43-a941daae0a5f	d21dae87-4987-4b71-9b45-04f70b28f382
966fc38d-fe6f-4f7c-bad2-bcda0f75a5ab	clp7cgv29000ztdeepv7c7g0b	e7mkmg	https://tsttst.s3.amazonaws.com/680c4497-400b-44d1-a19a-9ab1182aa662.jpeg	A letter with a golden seal	00000	PENDING	Amazon	\N	\N	2023-09-20 20:13:29.793	2023-11-20 20:16:23.461	\N	cca7ad10-9a7f-4f7b-8e9d-6777725caef5	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
940b2ade-4098-4873-8ed7-3d59b0b8eb69	clp7bxxg3000dtdeefxdcx9ha	g8lqsc	https://tsttst.s3.amazonaws.com/610f44d3-81c2-487f-91c6-3ddab1d0a299.jpeg	A big package	00000	PENDING	Correios	\N	\N	2023-09-20 19:58:46.418	2023-11-20 20:16:23.461	\N	540f7cf6-b2bf-4340-a49e-67a39335f1c2	d21dae87-4987-4b71-9b45-04f70b28f382
93591d14-2aa1-49f9-917b-fa91bf01b587	clp7cdg32000rtdeeai7uboow	8u4ztw	https://tsttst.s3.amazonaws.com/a70f4bd0-86c8-4b26-8324-1d370e685ec6.jpeg	A letter with golden	00000	PENDING	Amazon	\N	\N	2023-08-20 20:10:50.413	2023-11-20 20:16:23.461	\N	717902d1-7487-45df-b70f-79d48c8bd1c3	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
80e554ab-b018-4e86-be70-1d36d1ff7ab3	clp7chfza0013tdeedz62b6yy	nazyje	https://tsttst.s3.amazonaws.com/6519fe98-d701-4e0a-967c-87d804ed81fc.jpeg	A big package	00000	PENDING	Amazon	\N	\N	2023-08-20 20:13:56.902	2023-11-20 20:16:23.461	\N	cca7ad10-9a7f-4f7b-8e9d-6777725caef5	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
7538dfbe-9ed6-4525-a1e0-36086b0d9dea	clp7cd7yj000ptdeedrs1xstx	4m5u3t	https://tsttst.s3.amazonaws.com/beca14e5-9eb9-4b80-bfc6-ed20ae7fa0b5.jpeg	A medium package	00000	PENDING	Correios	\N	\N	2023-08-20 20:10:39.88	2023-11-20 20:16:23.461	\N	717902d1-7487-45df-b70f-79d48c8bd1c3	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
72952e2d-fa79-4fa8-a9d2-9ef2ebc12683	clp7chhzi0015tdeeu6p0r4ai	2p1n9a	https://tsttst.s3.amazonaws.com/291a5f0d-d4d3-4fb6-8963-445e17d51abb.jpeg	A package	00000	PENDING	Amazon	\N	\N	2023-07-20 20:13:59.503	2023-11-20 20:16:23.461	\N	cca7ad10-9a7f-4f7b-8e9d-6777725caef5	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
3f6fe471-ee7f-4a6f-822e-91401b1a424c	clp7by52l000htdeevcud1byw	nj03wq	https://tsttst.s3.amazonaws.com/809b80e6-619e-4a3b-a9b2-bbf517da5ed7.jpeg	Two small packages	00000	PENDING	Amazon	\N	\N	2023-02-20 19:58:56.301	2023-11-20 20:16:23.461	\N	540f7cf6-b2bf-4340-a49e-67a39335f1c2	d21dae87-4987-4b71-9b45-04f70b28f382
43aa215f-6a3d-4f37-901f-90546bcf31b5	clp7ca9zn000ltdee33y012fz	8giqd8	https://tsttst.s3.amazonaws.com/82c01be5-4fed-45a1-8c9e-dcbe0d349c32.jpeg	A letter with snow	00000	PENDING	Correios	\N	\N	2023-03-20 20:08:22.547	2023-11-20 20:16:23.461	\N	de60559c-2d61-4b2b-be48-149915c1ab96	d21dae87-4987-4b71-9b45-04f70b28f382
4bff261b-529c-48b1-abdf-ee4c693acb05	clp7bx18d0007tdeedhqbb83y	2a40gv	https://tsttst.s3.amazonaws.com/2fe8d963-3f6f-424e-9702-6f921a7182ae.jpeg	A little one package	00000	PENDING	Amazon	\N	\N	2023-04-20 19:58:04.669	2023-11-20 20:16:23.461	\N	48cb8d7b-208d-421c-ba43-a941daae0a5f	d21dae87-4987-4b71-9b45-04f70b28f382
6039e579-d506-425b-ac60-065cc9a42804	clp7cd2el000ntdee6sh3o3q3	9t44zz	https://tsttst.s3.amazonaws.com/0c9789b7-27d9-4c1b-9150-b658acf38a55.jpeg	A golden package	00000	PENDING	Correios	\N	\N	2023-05-20 20:10:32.685	2023-11-20 20:16:23.461	\N	717902d1-7487-45df-b70f-79d48c8bd1c3	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
6fdf03fa-815f-4fcf-a236-3d87043ea6c1	clp7cg1ok000vtdeeijl2lepm	itwlee	https://tsttst.s3.amazonaws.com/f081d366-42aa-401f-8163-0dd17522dabb.jpeg	A very small package	00000	PENDING	Amazon	\N	\N	2023-06-20 20:12:51.717	2023-11-20 20:16:23.461	\N	b5e35d45-3a97-4b05-810b-11565dc63879	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
674e4417-ef04-4d32-9407-36a413a11bc2	clp7cgjpl000xtdee1ns4nxa4	xcawgs	https://tsttst.s3.amazonaws.com/cc278984-5e9f-4ca4-8962-7922a35415ae.jpeg	A medium package	00000	PENDING	Amazon	\N	\N	2023-06-20 20:13:15.078	2023-11-20 20:16:23.461	\N	cca7ad10-9a7f-4f7b-8e9d-6777725caef5	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3
\.


--
-- Data for Name: Resident; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."Resident" (id, name, "buildingApartment", "phoneNumber", email, "condominiumId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
717902d1-7487-45df-b70f-79d48c8bd1c3	Cersei Lannister	301, Casterly Rock	5581987032341@c.us	cersei@lannister.com	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3	2023-11-20 18:30:20.721	2023-11-20 18:30:20.721	\N
cca7ad10-9a7f-4f7b-8e9d-6777725caef5	Jaime Lannister	202, King's Landing	5581987032341@c.us	jaime@lannister.com	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3	2023-11-20 18:34:11.885	2023-11-20 18:34:11.885	\N
540f7cf6-b2bf-4340-a49e-67a39335f1c2	Arya Stark	114, Winterfell	5581932342341@c.us	arya@stark.com	d21dae87-4987-4b71-9b45-04f70b28f382	2023-11-20 19:48:36.766	2023-11-20 19:48:36.766	\N
48cb8d7b-208d-421c-ba43-a941daae0a5f	Edward Stark	112, Winterfel	5581983143341@c.us	edward@stark.com	d21dae87-4987-4b71-9b45-04f70b28f382	2023-11-20 19:43:50.118	2023-11-20 20:07:39.692	\N
de60559c-2d61-4b2b-be48-149915c1ab96	Jon Snow	112, The Wall	5581912343341@c.us	jon@snow.com	d21dae87-4987-4b71-9b45-04f70b28f382	2023-11-20 19:44:54.904	2023-11-20 20:07:39.692	\N
b5e35d45-3a97-4b05-810b-11565dc63879	Tyrion Lannister	303, King's Landing	5581982323341@c.us	tyrion@lannister.com	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3	2023-11-20 18:35:24.287	2023-11-20 20:11:32.649	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."User" (id, login, password, name, roles, "createdAt", "updatedAt", "deletedAt", "condominiumId", "rateId") FROM stdin;
168d47f5-ff49-4903-87bf-2749bb6e1357	doorman@doorman.com	$2b$10$OstDmdY2WmxuoMitQOD6CujSkHXwvrcnTJ0RBrb.qzeq1rBYUspYq	DOORMAN Dev	{DOORMAN}	2023-11-20 18:26:23.54	2023-11-20 18:26:23.54	\N	abdd917f-ef24-4fc2-a622-b7eaddbdbfb3	\N
631edc4f-2797-432c-a65e-d78e322da319	admin@admin.com	$2b$10$5noyVzmd0.ME/R85igQAbOYuVFsfnCeMcldIhZxfLhIGOhsG9.xnm	ADMIN Dev	{ADMIN}	2023-11-20 18:26:52.011	2023-11-20 18:26:52.011	\N	d21dae87-4987-4b71-9b45-04f70b28f382	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3ebaf3e3-3021-421f-bc7e-7503b555a2b9	c7e62066b5a2376f5e8787ca9540e00ea0f5b783a705fb76492a0f44acc386d2	2023-11-20 17:31:58.488925+00	20230726234441_	\N	\N	2023-11-20 17:31:58.366657+00	1
2378664f-951a-49df-9db4-e3e4f9a212fb	063c5045804335e96293f9fa4edc0aa63006395f57e2efdf5403770214ee4c52	2023-11-20 17:31:58.499188+00	20231103183410_	\N	\N	2023-11-20 17:31:58.490821+00	1
\.


--
-- Data for Name: rate; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public.rate (id, value, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: Condominium Condominium_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Condominium"
    ADD CONSTRAINT "Condominium_pkey" PRIMARY KEY (id);


--
-- Name: InboxMessageErrors InboxMessageErrors_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."InboxMessageErrors"
    ADD CONSTRAINT "InboxMessageErrors_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Resident Resident_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Resident"
    ADD CONSTRAINT "Resident_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: rate rate_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public.rate
    ADD CONSTRAINT rate_pkey PRIMARY KEY (id);


--
-- Name: Condominium_id_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "Condominium_id_key" ON public."Condominium" USING btree (id);


--
-- Name: InboxMessageErrors_id_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "InboxMessageErrors_id_key" ON public."InboxMessageErrors" USING btree (id);


--
-- Name: Order_id_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "Order_id_key" ON public."Order" USING btree (id);


--
-- Name: Order_url_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "Order_url_key" ON public."Order" USING btree (url);


--
-- Name: Resident_email_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "Resident_email_key" ON public."Resident" USING btree (email);


--
-- Name: Resident_id_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "Resident_id_key" ON public."Resident" USING btree (id);


--
-- Name: Resident_name_buildingApartment_idx; Type: INDEX; Schema: public; Owner: username
--

CREATE INDEX "Resident_name_buildingApartment_idx" ON public."Resident" USING btree (name, "buildingApartment");


--
-- Name: User_id_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "User_id_key" ON public."User" USING btree (id);


--
-- Name: User_login_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "User_login_key" ON public."User" USING btree (login);


--
-- Name: rate_id_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX rate_id_key ON public.rate USING btree (id);


--
-- Name: Order Order_addresseeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_addresseeId_fkey" FOREIGN KEY ("addresseeId") REFERENCES public."Resident"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_condominiumId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES public."Condominium"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Resident Resident_condominiumId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Resident"
    ADD CONSTRAINT "Resident_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES public."Condominium"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_condominiumId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES public."Condominium"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_rateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES public.rate(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

