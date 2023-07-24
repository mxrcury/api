CURRENT_DATE=$(date '+%Y-%m-%d')

# pg_dump -U $DB_USERNAME -h $DB_HOST -W -F t $DB_NAME >./backup-files/$DB_NAME\_$CURRENT_DATE\_backup.sql.gz
pg_dump -h $POSTGRES_HOST -U $POSTGRES_USER $POSTGRES_DB -w -Fc >/backup-files/$POSTGRES_DB\_$CURRENT_DATE\_backup.sql.gz
