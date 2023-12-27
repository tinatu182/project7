


CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    "firstName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "imageUrl" character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
)

CREATE TABLE IF NOT EXISTS public."Messages"
(
    id integer NOT NULL DEFAULT nextval('"Messages_id_seq"'::regclass),
    "userId" integer NOT NULL,
    content character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "mediaUrl" character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Messages_pkey" PRIMARY KEY (id),
    CONSTRAINT "Messages_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS public."Ledgers"
(
    id integer NOT NULL DEFAULT nextval('"Ledgers_id_seq"'::regclass),
    "ledgerId" integer NOT NULL,
    read boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer NOT NULL,
    CONSTRAINT "Ledgers_pkey" PRIMARY KEY (id),
    CONSTRAINT "Ledgers_ledgerId_fkey" FOREIGN KEY ("ledgerId")
        REFERENCES public."Messages" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)