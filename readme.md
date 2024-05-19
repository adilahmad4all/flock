local surrealdb instance
sudo docker run --rm --pull always -p 8000:8000 surrealdb/surrealdb:latest start --log full --user root --pass root

jawax68676@picdv.com
1@345Qwert

docker run -it --rm --entrypoint cqlsh scylladb/scylla -u root -p root --network=host 

CREATE KEYSPACE flock WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1' : 3} AND durable_writes = true;
  USE flock;

CREATE TABLE Users (
    username text,
    password text,
    email text,
    bio text,
    image text,
    token text,
     PRIMARY KEY (username)
);


CREATE TABLE Users (
   
   username text,
   password text,
   email text,
   bio text,
   image text,
   tocken text,
   PRIMARY KEY ( username )
);
CREATE TABLE Users (
   pet_chip_id uuid,
   time timestamp,
   heart_rate int,
   PRIMARY KEY (pet_chip_id)
);
INSERT INTO monkey_species (species, common_name, population, average_size) VALUES ('Saguinus niger', 'Black tamarin', 10000, 500);
SELECT * FROM monkey_species;