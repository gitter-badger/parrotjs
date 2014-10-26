do (fn = parrot.store) ->

  ## -- Private --------------------------------------------------------------

  fn._storage = (type) ->
    if type is 'local' then localStorage else sessionStorage

  fn._get = (type, key, object=false) ->
    if object
      JSON.parse(@_storage(type).getItem(key))
    else
      @_storage(type).getItem(key)

  fn._set = (type, key, data) ->
    unless typeof data is 'string'
      data = JSON.stringify(data)
      @_storage(type).setItem(key, data)
      @[type][key] = parrot._partial(@_get, type, key, true).bind(fn)
    else
      @_storage(type).setItem(key, data)
      @[type][key] = parrot._partial(@_get, type, key, false).bind(fn)

  fn._clear = (type, key) ->
    delete @[type][key]
    @_storage(type).removeItem(key)

  fn._clearAll = (type) ->
    keys = Object.keys(@_storage(type))
    delete @[type][key] for key in keys
    @_storage(type).clear()

  fn._size = (type) ->
    @_storage(type).length

  fn._is = (type, key) ->
    if @_storage(type)[key]? then true else false

  ## -- Public ---------------------------------------------------------------

  ## LocalStorage

  fn.local.set = (key, data) ->
    parrot.store._set 'local', key, data
    this

  fn.local.clear = (key) ->
    parrot.store._clear 'local', key
    this

  fn.local.clearAll = ->
    parrot.store._clearAll 'local'
    this

  fn.local.size = ->
    parrot.store._size 'local'

  fn.local.isAvailable = ->
    key = if arguments.length is 0 then 'session' else arguments[0]
    parrot.store._is 'session', key

  ## sessionStorage

  fn.session.set = ->
    if arguments.length is 1
      key  = 'session'
      data = arguments[0]
    else
      key  = arguments[0]
      data = arguments[1]

    parrot.store._set 'session', key, data
    this

  fn.session.clear = ->
    key = if arguments.length is 0 then 'session' else arguments[0]
    parrot.store._clear 'session', key
    this

  fn.session.clearAll = ->
    parrot.store._clearAll 'session'
    this

  fn.session.size = ->
    parrot.store._size 'session'

  fn.session.isAvailable = ->
    key = if arguments.length is 0 then 'session' else arguments[0]
    parrot.store._is 'session', key