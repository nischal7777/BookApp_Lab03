if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/zoro/.gradle/caches/8.10.2/transforms/f77a05ab4ea4e47f298fe8408466986f/transformed/hermes-android-0.76.1-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/zoro/.gradle/caches/8.10.2/transforms/f77a05ab4ea4e47f298fe8408466986f/transformed/hermes-android-0.76.1-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

