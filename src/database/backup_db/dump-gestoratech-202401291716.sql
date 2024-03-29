PGDMP                       |            gestoratech    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    gestoratech    DATABASE     �   CREATE DATABASE gestoratech WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE gestoratech;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            T           1247    16410    roles    TYPE     J   CREATE TYPE public.roles AS ENUM (
    'Usuário',
    'Administrador'
);
    DROP TYPE public.roles;
       public          postgres    false    5            W           1247    16416    sectors    TYPE     9  CREATE TYPE public.sectors AS ENUM (
    'Administrativo',
    'Comercial',
    'Contábil',
    'Contábil II',
    'Fiscal Contábil',
    'Controladoria',
    'Diretoria',
    'DP',
    'Financeiro',
    'Fiscal',
    'Marketing',
    'Qualidade',
    'RH',
    'Societário',
    'TI',
    'Indeterminado'
);
    DROP TYPE public.sectors;
       public          postgres    false    5            �            1259    16460    inventories    TABLE     �  CREATE TABLE public.inventories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    sector character varying NOT NULL,
    model character varying NOT NULL,
    brand character varying NOT NULL,
    asset character varying NOT NULL,
    equipment character varying NOT NULL,
    keyboard character varying NOT NULL,
    mouse character varying NOT NULL
);
    DROP TABLE public.inventories;
       public         heap    postgres    false    5    5    5            �            1259    16449    users    TABLE     b  CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    ramal integer DEFAULT 0,
    role public.roles DEFAULT 'Usuário'::public.roles,
    sector public.sectors DEFAULT 'Indeterminado'::public.sectors
);
    DROP TABLE public.users;
       public         heap    postgres    false    5    5    852    855    855    5    852            �          0    16460    inventories 
   TABLE DATA           l   COPY public.inventories (id, username, sector, model, brand, asset, equipment, keyboard, mouse) FROM stdin;
    public          postgres    false    217   0       �          0    16449    users 
   TABLE DATA           O   COPY public.users (id, name, email, password, ramal, role, sector) FROM stdin;
    public          postgres    false    216   M       6           2606    16467    inventories inventories_id_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.inventories
    ADD CONSTRAINT inventories_id_key UNIQUE (id);
 H   ALTER TABLE ONLY public.inventories DROP CONSTRAINT inventories_id_key;
       public            postgres    false    217            4           2606    16459    users users_id_key 
   CONSTRAINT     K   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_key UNIQUE (id);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT users_id_key;
       public            postgres    false    216            �      x������ � �      �     x�u��R�0 ��s��������ED'��xɊ��axzQFo^����!�H*x�L0L�B�Ic�%R#�#0�\9ooV̩�f�]?��~��:&l�7��L�P�&�t�D�3����Ѣ���)��/�ۘ�胿�^�!ڕ���d�Ӂ��퀎A7����i��;&��$��g�@](���Ґ�]�A�R�I�g�����O�a�*59T����4]����H8;o�Y��hӔ�x�s�?�-},��=.�Q��A|$i�     