--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg110+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg110+2)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid NOT NULL,
    productid integer NOT NULL,
    fullname character varying(50) NOT NULL,
    emailaddress character varying(100) NOT NULL,
    phonenumber character varying(20),
    payed boolean DEFAULT false
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    price_amount integer NOT NULL,
    price_currency character varying(4) NOT NULL,
    image character varying(100)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, productid, fullname, emailaddress, phonenumber, payed) FROM stdin;
0f3479f5-1982-41aa-83e5-a553c3f841ff	2	John Doe 301	jd301@example.host	123456301	f
132e71c3-1435-4357-8681-e87f0ca713bf	2	John Doe 302	jd302@example.host	123456302	f
cf7e191c-725f-4006-9a80-23d20bd568d9	2	John Doe 301	jd301@example.host	123456301	f
393afd60-d877-40ca-b99d-e72be46a1baf	2	John Doe 302	jd302@example.host	123456302	f
1aeef4f0-7b3d-484f-a95d-00001ad19965	2	John Doe 302	jd302@example.host	123456302	f
36faceac-2133-41e5-9c4b-91c9741f2d7d	2	John Doe 303	jd303@example.host	123456303	t
465283cf-14fd-46a6-846e-0d5ec9802769	2	John Doe 305	jd305@examples.host	123456305	t
b0bc2b28-ae71-4444-b98b-cc5c69d8dd8d	2	John Doe	jd10@example.host	123	t
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price_amount, price_currency, image) FROM stdin;
1	Some Product 1	100	USD	no-photo-2.png
2	Another Product 2	200	USD	no-photo.webp
3	Product 3	2999	USD	no-photo.webp
\.


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: orders orders_productid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(id);


--
-- PostgreSQL database dump complete
--

